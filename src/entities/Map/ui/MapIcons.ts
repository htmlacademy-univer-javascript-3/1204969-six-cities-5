import { Icon } from 'leaflet';

const URL_MARKER_DEFAULT = 'img/pin.svg';

const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
