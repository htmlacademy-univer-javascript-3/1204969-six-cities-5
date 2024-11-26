import { useEffect, useRef } from 'react';
import { City } from '../../City';
import { useMap } from '../model/useMap';
import { layerGroup, Marker } from 'leaflet';
import { Point } from '../interfaces';
import { currentCustomIcon, defaultCustomIcon } from './MapIcons';

type MapProps = {
  city: City;
  points: Point[];
  selectedPointId?: Point['id'];
};

export const Map: React.FC<MapProps> = ({ city, points, selectedPointId }) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

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
