import { NameSpace } from '../../../app/consts';
import { State } from '../../../app/store/interfaces';

export const getOffer = (state: State) => state[NameSpace.OFFER].offer;

export const getOfferFetchStatus = (state: State) =>
  state[NameSpace.OFFER].offerFetchStatus;

export const getOffers = (state: State) => state[NameSpace.OFFER].offers;

export const getOffersFetchStatus = (state: State) =>
  state[NameSpace.OFFER].offersFetchStatus;

export const getActiveOfferId = (state: State) =>
  state[NameSpace.OFFER].activeOfferId;
