export const CityNames = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export type CityName = (typeof CityNames)[number];

export type City = {
  name: CityName;
  latitude: number;
  longitude: number;
};
