import { useCallback, useState, useEffect, useRef, useContext } from 'react';

import { Coordinate } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';

import makeStyles from '@mui/styles/makeStyles';

import { useTranslation } from 'react-i18next';

import { debounce } from 'lodash';

import { api } from '../../../app';
import { EVENT_NAMES } from '../../../api/events/event';
import { payloadIsABoolean } from '../../../api/events/payloads/boolean-payload';
import { MapContext } from '../../app-start';

const useStyles = makeStyles((theme) => ({
  mousePositionContainer: {
    display: 'flex',
    padding: theme.spacing(0, 4),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    alignItems: 'center',
  },
  mousePositionText: {
    fontSize: theme.typography.subtitle2.fontSize,
    color: theme.palette.primary.light,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

// degree char
const deg = String.fromCharCode(176);

/**
 * Format the coordinates for degrees - minutes - seconds
 * @param {number} value the value to format
 * @param {string} card the cardinality north/south or east/west
 * @return {string} the formatted value
 */
function coordFormnat(value: number, card: string): string {
  const d = Math.floor(Math.abs(value)) * (value < 0 ? -1 : 1);
  const m = Math.floor(Math.abs((value - d) * 60));
  const s = Math.round((Math.abs(value) - Math.abs(d) - m / 60) * 3600);
  return `${Math.abs(d)}${deg} ${m >= 10 ? `${m}` : `0${m}`}' ${s >= 10 ? `${s}` : `0${s}`}" ${card}`;
}

/**
 * Mouse position properties interface
 */
interface MousePositionProps {
  id: string;
}

/**
 * Create the mouse position
 * @param {MousePositionProps} props the mouse position properties
 * @return {JSX.Element} the mouse position component
 */
export function MousePosition(props: MousePositionProps): JSX.Element {
  const { id } = props;

  const { t } = useTranslation<string>();

  const classes = useStyles();

  const [position, setPosition] = useState({ lng: '--', lat: '--' });

  // keep track of crosshair status to know when update coord from keyboard navigation
  const isCrosshairsActive = useRef(false);

  const mapConfig = useContext(MapContext);

  const mapId = mapConfig.id;

  /**
   * Format the coordinates output
   * @param {Coordinate} lnglat the Lng and Lat value to format
   */
  function formatCoord(lnglat: Coordinate) {
    const lng = coordFormnat(lnglat[0], lnglat[0] < 0 ? t('mapctrl.mouseposition.west') : t('mapctrl.mouseposition.east'));
    const lat = coordFormnat(lnglat[1], lnglat[1] > 0 ? t('mapctrl.mouseposition.north') : t('mapctrl.mouseposition.south'));
    setPosition({ lng, lat });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onMouseMove = useCallback(
    debounce((e) => {
      formatCoord(toLonLat(e.coordinate, api.projection.projections[api.map(mapId).currentProjection]));
    }, 250),
    [t]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onMoveEnd = useCallback(
    debounce((e) => {
      if (isCrosshairsActive.current) {
        formatCoord(toLonLat(e.map.getView().getCenter(), api.projection.projections[api.map(mapId).currentProjection]));
      }
    }, 500),
    [t]
  );

  useEffect(() => {
    const { map } = api.map(mapId);

    map.on('pointermove', onMouseMove);
    map.on('moveend', onMoveEnd);

    // on map crosshair enable\disable, set variable for WCAG mouse position
    api.event.on(
      EVENT_NAMES.MAP.EVENT_MAP_CROSSHAIR_ENABLE_DISABLE,
      (payload) => {
        if (payloadIsABoolean(payload)) {
          if (payload.handlerName!.includes(id)) {
            isCrosshairsActive.current = payload.status;
          }
        }
      },
      mapId
    );

    return () => {
      api.event.off(EVENT_NAMES.MAP.EVENT_MAP_CROSSHAIR_ENABLE_DISABLE, mapId);
      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('moveend', onMoveEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.mousePositionContainer}>
      <span className={classes.mousePositionText}>
        {position.lat} | {position.lng}
      </span>
    </div>
  );
}
