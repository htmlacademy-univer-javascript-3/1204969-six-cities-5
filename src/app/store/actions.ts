import { createAction } from '@reduxjs/toolkit';
import { City } from '../../entities/City';
import { OfferCardEntity } from '../../entities/OfferCard';

export const setCity = createAction<City>('city/set');

export const setOffers = createAction<OfferCardEntity[]>('offers/set');
