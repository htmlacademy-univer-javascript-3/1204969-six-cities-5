import { City } from '../../entities/City';
import { OfferCardEntity } from '../../entities/OfferCard';
import { store } from '.';

export type State = {
  city: City;
  offers?: OfferCardEntity[];
  isOffersLoading?: boolean;
};

export type AppDispatch = typeof store.dispatch;
