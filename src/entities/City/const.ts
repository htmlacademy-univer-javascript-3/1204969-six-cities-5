import { City, CityName } from './interfaces';

export const cities: Record<CityName, City> = {
  Paris: {
    name: 'Paris',
    latitude: 48.85661,
    longitude: 2.351499,
  },
  Cologne: {
    name: 'Cologne',
    latitude: 50.938361,
    longitude: 6.959974,
  },
  Brussels: {
    name: 'Brussels',
    latitude: 50.8476,
    longitude: 4.3572,
  },
  Amsterdam: {
    name: 'Amsterdam',
    latitude: 52.374,
    longitude: 4.89,
  },
  Hamburg: {
    name: 'Hamburg',
    latitude: 53.550341,
    longitude: 10.000654,
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    latitude: 51.225402,
    longitude: 6.776314,
  },
};
