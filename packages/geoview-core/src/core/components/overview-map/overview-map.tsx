import { useContext, useEffect, useState } from 'react';

import TileLayer from 'ol/layer/Tile';
import { OverviewMap as OLOverviewMap } from 'ol/control';

import { EVENT_NAMES } from '../../../api/events/event';
import { api } from '../../../app';
import { MapContext } from '../../app-start';

import { payloadIsABasemapLayerArray } from '../../types/cgpv-types';

export function OverviewMap(): JSX.Element {
  const [overviewMap, setOverviewMap] = useState<OLOverviewMap>();

  const mapConfig = useContext(MapContext);

  const mapId = mapConfig.id;

  useEffect(() => {
    // listen to adding a new basemap events
    api.event.on(
      EVENT_NAMES.BASEMAP.EVENT_BASEMAP_LAYERS_UPDATE,
      (payload) => {
        if (payloadIsABasemapLayerArray(payload)) {
          if (payload.handlerName === mapId) {
            // remove previous basemaps
            const layers = overviewMap!.getOverviewMap().getAllLayers();

            // loop through all layers on the map
            for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
              const layer = layers[layerIndex];

              // get group id that this layer belongs to
              const layerId = layer.get('id');

              // check if the group id matches basemap
              if (layerId && layerId === 'basemap') {
                // remove the basemap layer
                overviewMap!.getOverviewMap().removeLayer(layer);
              }
            }

            // add basemap layers
            payload.layers.forEach((layer, index) => {
              const basemapLayer = new TileLayer({
                opacity: layer.opacity,
                source: layer.source,
              });

              // set this basemap's group id to basemap
              basemapLayer.set('id', 'basemap');

              // add the basemap layer
              overviewMap!.getOverviewMap().addLayer(basemapLayer);

              // render the layer
              basemapLayer.changed();
            });
          }
        }
      },
      mapId
    );

    return () => {
      api.event.off(EVENT_NAMES.BASEMAP.EVENT_BASEMAP_LAYERS_UPDATE, mapId);
    };
  }, [mapId, overviewMap]);

  useEffect(() => {
    const { map } = api.map(mapId);

    const defaultBasemap = api.map(mapId).basemap.activeBasemap;

    const overviewMapContrsol = new OLOverviewMap({
      // see in overviewmap-custom.html to see the custom CSS used
      className: `ol-overviewmap ol-custom-overviewmap`,
      layers: defaultBasemap?.layers.map((layer) => {
        // create a tile layer for this basemap layer
        const tileLayer = new TileLayer({
          opacity: layer.opacity,
          source: layer.source,
        });

        // add this layer to the basemap group
        tileLayer.set('id', 'basemap');

        return tileLayer;
      }),
      collapseLabel: '\u00BB',
      label: '\u00AB',
      collapsed: false,
      rotateWithView: true,
    });

    setOverviewMap(overviewMapContrsol);

    map.addControl(overviewMapContrsol);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
}
