import { FetchStatus } from '../../../app/consts';
import { makeOfferMaximum, makeOffers } from '../lib/mocks';
import {
  clearOffer,
  clearOffers,
  offerCardSlice,
  setActiveOfferId,
  setOffer,
  setOfferLoadingStatus,
  setOffers,
  setOffersLoadingStatus,
} from './reducer';

const commonInitialState = {
  offersFetchStatus: FetchStatus.INITIAL,
  offerFetchStatus: FetchStatus.INITIAL,
};

describe('offer card slice', () => {
  it('should correct change offer', () => {
    const offer = makeOfferMaximum();

    const expectedState = {
      ...commonInitialState,
      offer,
    };

    const result = offerCardSlice.reducer(commonInitialState, setOffer(offer));

    expect(result).toEqual(expectedState);
  });

  it('should correct change offers', () => {
    const offers = makeOffers();

    const expectedState = {
      ...commonInitialState,
      offers,
    };

    const result = offerCardSlice.reducer(
      commonInitialState,
      setOffers(offers),
    );

    expect(result).toEqual(expectedState);
  });

  it('should correct change offer fetch status', () => {
    const expectedState = {
      ...commonInitialState,
      offerFetchStatus: FetchStatus.SUCCESS,
    };

    const result = offerCardSlice.reducer(
      commonInitialState,
      setOfferLoadingStatus(FetchStatus.SUCCESS),
    );

    expect(result).toEqual(expectedState);
  });

  it('should correct change offers fetch status', () => {
    const expectedState = {
      ...commonInitialState,
      offersFetchStatus: FetchStatus.SUCCESS,
    };

    const result = offerCardSlice.reducer(
      commonInitialState,
      setOffersLoadingStatus(FetchStatus.SUCCESS),
    );

    expect(result).toEqual(expectedState);
  });

  it('should correct clear offer', () => {
    const initialState = {
      ...commonInitialState,
      offer: makeOfferMaximum(),
      offerFetchStatus: FetchStatus.SUCCESS,
    };

    const expectedState = {
      ...commonInitialState,
      offer: undefined,
      offerFetchStatus: FetchStatus.INITIAL,
    };

    const result = offerCardSlice.reducer(initialState, clearOffer());

    expect(result).toEqual(expectedState);
  });

  it('should correct clear offers', () => {
    const initialState = {
      ...commonInitialState,
      offers: makeOffers(),
      offersFetchStatus: FetchStatus.SUCCESS,
    };

    const expectedState = {
      ...commonInitialState,
      offers: undefined,
      offersFetchStatus: FetchStatus.INITIAL,
    };

    const result = offerCardSlice.reducer(initialState, clearOffers());

    expect(result).toEqual(expectedState);
  });

  it('should correct set active offer id', () => {
    const expectedState = {
      ...commonInitialState,
      activeOfferId: '1',
    };

    const result = offerCardSlice.reducer(
      commonInitialState,
      setActiveOfferId('1'),
    );

    expect(result).toEqual(expectedState);
  });
});
