import { City } from '../../entities/City';
import { OfferCardEntity } from '../../entities/OfferCard';
import { User } from '../../entities/User/interfaces';
import { AuthorizationStatus } from '../consts';
import { store } from '.';

export type State = {
  city: City;

  offers?: OfferCardEntity[];
  isOffersLoading: boolean;

  user?: User;
  authorizationStatus: AuthorizationStatus;
};

export type AppDispatch = typeof store.dispatch;
