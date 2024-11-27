import { createAction } from '@reduxjs/toolkit';

import { City } from '../../entities/City';
import { OfferCardEntity } from '../../entities/OfferCard';
import { User } from '../../entities/User/interfaces';
import { AuthorizationStatus } from '../consts';

export const setCity = createAction<City>('city/set');

export const setOffers = createAction<OfferCardEntity[]>('offers/set');

export const setOffersLoadingStatus = createAction<boolean>(
  'offers/setLoadingStatus',
);

export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/setAuthorizationStatus',
);

export const setUser = createAction<User | undefined>('user/set');
