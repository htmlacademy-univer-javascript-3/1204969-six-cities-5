export type OfferType = 'Apartment' | 'Room';

export type OfferCardEntity = {
  id: number;
  isPremium?: boolean;
  imgSrc: string;
  imgAlt?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  price: number;
  name: string;
  type: OfferType;
};
