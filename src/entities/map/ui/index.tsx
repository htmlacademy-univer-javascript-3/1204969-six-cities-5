import { layerGroup, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';

import { useAppSelector } from '../../../app/store/hooks';
import { City } from '../../city';
import { getActiveOfferId } from '../../offer-card';
import { Point } from '../interfaces';
import { useMap } from '../model/use-map';
import { currentCustomIcon, defaultCustomIcon } from './map-icons';

type MapProps = {
  city: City;
  points: Point[];
};

export const Map: React.FC<MapProps> = ({ city, points }) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const selectedPointId = useAppSelector(getActiveOfferId);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            point.id === selectedPointId
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPointId]);

  return <div style={{ height: '500px' }} ref={mapRef}></div>;
};
