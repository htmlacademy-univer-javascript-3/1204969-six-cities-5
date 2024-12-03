import { Action } from '@reduxjs/toolkit';

import { ApiRoutes } from '../../../app/api/routes';
import { FetchStatus, NameSpace } from '../../../app/consts';
import { initAsyncActionsStore } from '../../../app/utils/mocks';
import { setReviews, setReviewsFetchStatus } from '..';
import { makeReview, makeReviews } from '../utils/mocks';
import { addOfferReview, fetchOfferReviews } from './api-actions';

const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('async review actions', () => {
  const { mockAxiosAdapter, mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.REVIEW]: { reviewsFetchStatus: FetchStatus.INITIAL },
    });
  });

  it('should dispatch "fetchOfferReviews.pending", "setReviewsFetchStatus"x2, "setReviews" and "fetchOfferReviews.fulfilled" with thunk "fetchOfferReviews" on 200', async () => {
    mockAxiosAdapter.onGet(ApiRoutes.LOGIN).reply(200, makeReviews());

    await store.dispatch(fetchOfferReviews('1'));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchOfferReviews.pending.type,
      setReviewsFetchStatus.type,
      setReviewsFetchStatus.type,
      setReviews.type,
      fetchOfferReviews.fulfilled.type,
    ]);
  });

  it('should dispatch "addOfferReview.pending" and "addOfferReview.fulfilled" with thunk "addOfferReview" on 200', async () => {
    mockAxiosAdapter.onGet(ApiRoutes.LOGIN).reply(200);

    await store.dispatch(addOfferReview({ offerId: '1', ...makeReview() }));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      addOfferReview.pending.type,
      addOfferReview.fulfilled.type,
    ]);
  });
});
