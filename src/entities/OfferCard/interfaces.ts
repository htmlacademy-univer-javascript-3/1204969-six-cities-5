import { CityName } from '../City';

export type OfferType = 'Apartment' | 'Room';

export type OfferCardEntity = {
  id: number;
  isPremium?: boolean;
  imgSrc: string;
  imgAlt?: string;
  rating: number;
  price: number;
  name: string;
  type: OfferType;
  isBookmarked?: boolean;
  city: CityName;
};
