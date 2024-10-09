import { City, CityName } from './interfaces';

export const cities: Partial<Record<CityName, City>> = {
  Amsterdam: {
    name: 'Amsterdam',
    latitude: 52.374,
    longitude: 4.89,
  },
};
