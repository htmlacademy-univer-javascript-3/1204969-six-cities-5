import { store } from '.';
import { City } from '../../entities/City';
import { OfferCardEntity } from '../../entities/OfferCard';

export type State = {
  city?: City;
  offers?: OfferCardEntity[];
};

export type AppDispatch = typeof store.dispatch;
