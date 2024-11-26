import { store } from '.';
import { City } from '../../entities/City';
import { OfferCardEntity } from '../../entities/OfferCard';

export type State = {
  city: City;
  offers?: OfferCardEntity[];
  isOffersLoading?: boolean;
};

export type AppDispatch = typeof store.dispatch;
