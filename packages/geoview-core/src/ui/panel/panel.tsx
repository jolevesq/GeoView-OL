/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
import React, { useRef, useState, useEffect, useCallback, useContext } from 'react';

import { useTranslation } from 'react-i18next';

import FocusTrap from 'focus-trap-react';

import makeStyles from '@mui/styles/makeStyles';
import { Card, CardHeader, CardContent } from '@mui/material';

import { Cast, TypePanelAppProps } from '../../core/types/cgpv-types';
import { HtmlToReact } from '../../core/containers/html-to-react';
import { MapContext } from '../../core/app-start';

import { api } from '../../app';
import { EVENT_NAMES } from '../../api/events/event';

import { IconButton, CloseIcon, Divider } from '..';
import { payloadBaseClass } from '../../api/events/payloads/payload-base-class';
import { payloadIsAPanelAction, payloadIsAPanelContent, payloadHasAButtonIdAndType } from '../../api/events/payloads/panel-payload';
import { inKeyfocusPayload } from '../../api/events/payloads/in-keyfocus-payload';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    width: 400,
    height: '100%',
    borderRadius: 0,
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: '100%',
    },
  },
  cardContainer: {
    flexBasis: 'auto',
    overflow: 'hidden',
    overflowY: 'auto',
    paddingBottom: '10px !important',
    boxSizing: 'border-box',
  },
  avatar: {
    color: theme.palette.primary.contrastText,
    height: 50,
    padding: 0,
    paddingLeft: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    margin: 0,
  },
  buttonIcon: {
    width: '1em',
    height: '1em',
    display: 'inherit',
    fontSize: theme.typography.button?.fontSize,
    alignItems: 'inherit',
    justifyContent: 'inherit',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: 0,
    userSelect: 'none',
  },
}));

/**
 * Create a panel with a header title, icon and content
 * @param {TypePanelAppProps} props panel properties
 *
 * @returns {JSX.Element} the created Panel element
 */
export function Panel(props: TypePanelAppProps): JSX.Element {
  const { panel, button } = props;

  // set the active trap value for FocusTrap
  const [panelStatus, setPanelStatus] = useState(false);

  const [actionButtons, setActionButtons] = useState<JSX.Element[] & React.ReactNode[]>([]);
  const [, updatePanelContent] = useState(0);

  const classes = useStyles(props);
  const { t } = useTranslation<string>();

  const mapConfig = useContext(MapContext)!;
  const mapId = mapConfig.id;

  const panelRef = useRef<HTMLButtonElement>(null);
  const panelHeader = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  /**
   * function that causes rerender when changing panel content
   */
  const updateComponent = useCallback(() => {
    updatePanelContent((count) => count + 1);
  }, []);

  /**
   * Close the panel
   */
  const closePanel = (): void => {
    // emit an event to hide the marker when using the details panel
    api.event.emit(payloadBaseClass(EVENT_NAMES.MARKER_ICON.EVENT_MARKER_ICON_HIDE, mapId));

    const buttonElement = document.getElementById(button.id!);

    if (buttonElement) {
      // put back focus on calling button
      document.getElementById(button.id!)?.focus();
    } else {
      const mapCont = api.map(mapConfig.id).map.getContainer();
      mapCont.focus();

      // if in focus trap mode, trigger the event
      if (mapCont.closest('.llwp-map')?.classList.contains('map-focus-trap')) {
        mapCont.classList.add('keyboard-focus');
        api.event.emit(inKeyfocusPayload(EVENT_NAMES.MAP.EVENT_MAP_IN_KEYFOCUS, `leaflet-map-${mapId}`));
      }
    }

    setPanelStatus(false);
  };

  // listen to change panel content and rerender right after the panel has been created
  api.event.on(
    EVENT_NAMES.PANEL.EVENT_PANEL_CHANGE_CONTENT,
    (payload) => {
      if (payloadIsAPanelContent(payload)) {
        // set focus on close button on panel content change
        setTimeout(() => {
          if (closeBtnRef && closeBtnRef.current) (closeBtnRef.current as HTMLElement).focus();
        }, 100);

        if (payload.buttonId === button.id!) {
          updateComponent();
        }
      }
    },
    mapId,
    button.id!
  );

  useEffect(() => {
    // if the panel was still open on reload then close it
    if (panel.status) {
      setPanelStatus(true);
    }

    // listen to open panel to activate focus trap and focus on close
    api.event.on(
      EVENT_NAMES.PANEL.EVENT_PANEL_OPEN,
      (payload) => {
        if (payloadHasAButtonIdAndType(payload)) {
          if (payload.buttonId === button.id! && payload.handlerName === mapId) {
            // set focus on close button on panel open
            setPanelStatus(true);

            if (closeBtnRef && closeBtnRef.current) {
              (closeBtnRef.current as HTMLElement).focus();
            }
          }
        }
      },
      mapId,
      button.id!
    );

    api.event.on(
      EVENT_NAMES.PANEL.EVENT_PANEL_CLOSE,
      (payload) => {
        if (payloadHasAButtonIdAndType(payload)) {
          if (payload.buttonId === button.id! && payload.handlerName === mapId) {
            closePanel();
          }
        }
      },
      mapId,
      button.id!
    );

    // listen to add action button event
    api.event.on(
      EVENT_NAMES.PANEL.EVENT_PANEL_ADD_ACTION,
      (payload) => {
        if (payloadIsAPanelAction(payload)) {
          if (payload.buttonId === button.id!) {
            const { actionButton } = payload;

            setActionButtons((prev) => [
              ...prev,
              <IconButton
                key={actionButton.id}
                tooltip={actionButton.title}
                tooltipPlacement="right"
                id={actionButton.id}
                aria-label={actionButton.title}
                onClick={Cast<React.MouseEventHandler>(actionButton.action)}
                size="large"
              >
                {typeof actionButton.icon === 'string' ? (
                  <HtmlToReact
                    style={{
                      display: 'flex',
                    }}
                    htmlContent={actionButton.icon}
                  />
                ) : typeof actionButton.icon === 'object' ? (
                  actionButton.icon
                ) : (
                  <actionButton.icon />
                )}
              </IconButton>,
            ]);
          }
        }
      },
      mapId,
      button.id!
    );

    // listen to remove action button event
    api.event.on(
      EVENT_NAMES.PANEL.EVENT_PANEL_REMOVE_ACTION,
      (payload) => {
        if (payloadIsAPanelAction(payload)) {
          if (payload.buttonId === button.id!) {
            setActionButtons((list) =>
              list.filter((item) => {
                return item.props.id !== payload.actionButton.id;
              })
            );
          }
        }
      },
      mapId,
      button.id!
    );

    return () => {
      api.event.off(EVENT_NAMES.PANEL.EVENT_PANEL_OPEN, mapId, button.id!);
      api.event.off(EVENT_NAMES.PANEL.EVENT_PANEL_CLOSE, mapId, button.id!);
      api.event.off(EVENT_NAMES.PANEL.EVENT_PANEL_ADD_ACTION, mapId, button.id!);
      api.event.off(EVENT_NAMES.PANEL.EVENT_PANEL_REMOVE_ACTION, mapId, button.id!);
      api.event.off(EVENT_NAMES.PANEL.EVENT_PANEL_CHANGE_CONTENT, mapId, button.id!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // set focus on close button on panel open
    if (closeBtnRef && closeBtnRef.current) if (button.visible) Cast<HTMLElement>(closeBtnRef.current).focus();
  }, [button, closeBtnRef]);

  return (
    <FocusTrap
      active={panelStatus}
      focusTrapOptions={{
        escapeDeactivates: false,
        clickOutsideDeactivates: true,
      }}
    >
      <Card
        ref={panelRef as React.MutableRefObject<null>}
        className={`${classes.root}`}
        style={{
          display: panelStatus ? 'flex' : 'none',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            closePanel();
          }
        }}
        {...{ 'data-id': button.id }}
      >
        <CardHeader
          className={classes.avatar}
          classes={{ action: classes.actionButton }}
          ref={panelHeader}
          avatar={
            typeof panel.icon === 'string' ? (
              <HtmlToReact className={classes.buttonIcon} htmlContent={panel.icon} />
            ) : typeof panel.icon === 'object' ? (
              panel.icon
            ) : (
              <panel.icon />
            )
          }
          title={t(panel.title)}
          action={
            panelStatus ? (
              <>
                {actionButtons}
                <IconButton
                  tooltip={t('general.close')}
                  tooltipPlacement="right"
                  className="cgpv-panel-close"
                  aria-label={t('general.close')}
                  size="large"
                  onClick={panel.close}
                  iconRef={closeBtnRef}
                >
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <></>
            )
          }
        />
        <Divider />
        <CardContent className={classes.cardContainer}>
          {typeof panel.content === 'string' ? (
            <HtmlToReact htmlContent={panel.content} />
          ) : typeof panel.content === 'object' ? (
            panel.content
          ) : (
            <panel.content />
          )}
        </CardContent>
      </Card>
    </FocusTrap>
  );
}
