import { City } from '../../entities/city';
import { OfferMaximum, OfferPreview } from '../../entities/offer-card';
import { CommentGet } from '../../entities/review/interfaces';
import { User } from '../../entities/user/interfaces';
import { AuthorizationStatus, FetchStatus } from '../consts';
import { store } from '.';

export type State = {
  city: City;

  offers?: OfferPreview[];
  offersFetchStatus: FetchStatus;

  user?: User;
  authorizationStatus: AuthorizationStatus;

  offer?: OfferMaximum;
  offerFetchStatus: FetchStatus;

  reviews?: CommentGet[];
  reviewsFetchStatus: FetchStatus;

  activeOfferId?: OfferPreview['id'];
};

export type AppDispatch = typeof store.dispatch;
