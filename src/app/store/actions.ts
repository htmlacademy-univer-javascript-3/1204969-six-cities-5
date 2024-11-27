import { createAction } from '@reduxjs/toolkit';

import { City } from '../../entities/City';
import { OfferCardEntity } from '../../entities/OfferCard';
import { OfferMaximum } from '../../entities/OfferCard/interfaces';
import { CommentGet } from '../../entities/Review/interfaces';
import { User } from '../../entities/User/interfaces';
import { AuthorizationStatus, FetchStatus } from '../consts';

export const setCity = createAction<City>('city/set');

export const setOffers = createAction<OfferCardEntity[]>('offers/set');
export const clearOffers = createAction('offers/clear');
export const setOffersLoadingStatus = createAction<FetchStatus>(
  'offers/setLoadingStatus',
);

export const setUser = createAction<User | undefined>('user/set');
export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/setAuthorizationStatus',
);

export const setOffer = createAction<OfferMaximum>('offer/set');
export const clearOffer = createAction('offer/clear');
export const setOfferLoadingStatus = createAction<FetchStatus>(
  'offer/setLoadingStatus',
);

export const setReviews = createAction<CommentGet[]>('reviews/set');
export const clearReviews = createAction('reviews/clear');
export const setReviewsLoadingStatus = createAction<FetchStatus>(
  'reviews/setLoadingStatus',
);
