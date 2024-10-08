import { useEffect, useRef } from 'react';
import { City } from '../../../entities/City';
import { useMap } from '../model/useMap';
import { layerGroup, Marker } from 'leaflet';
import { Point } from '../interfaces';
import { currentCustomIcon, defaultCustomIcon } from './MapIcons';

type MapProps = {
  city: City;
  points: Point[];
  selectedPoint?: Point;
};

export const Map: React.FC<MapProps> = ({ city, points, selectedPoint }) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.name === selectedPoint.name
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div style={{ height: '500px' }} ref={mapRef}></div>;
};
