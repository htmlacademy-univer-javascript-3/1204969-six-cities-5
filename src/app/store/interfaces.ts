import { City } from '../../entities/City';
import { OfferCardEntity } from '../../entities/OfferCard';
import { OfferMaximum } from '../../entities/OfferCard/interfaces';
import { CommentGet } from '../../entities/Review/interfaces';
import { User } from '../../entities/User/interfaces';
import { AuthorizationStatus, FetchStatus } from '../consts';
import { store } from '.';

export type State = {
  city: City;

  offers?: OfferCardEntity[];
  offersFetchStatus: FetchStatus;

  user?: User;
  authorizationStatus: AuthorizationStatus;

  offer?: OfferMaximum;
  offerFetchStatus: FetchStatus;

  reviews?: CommentGet[];
  reviewsFetchStatus: FetchStatus;

  activeOfferId?: OfferCardEntity['id'];
};

export type AppDispatch = typeof store.dispatch;
