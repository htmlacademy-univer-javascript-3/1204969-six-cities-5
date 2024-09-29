export type PlaceType = 'Apartment' | 'Room';

export type PlaceCardEntity = {
  isPremium?: boolean;
  imgSrc: string;
  imgAlt?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  price: number;
  name: string;
  type: PlaceType;
};
