import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { components } from '../../../../types/schema';
import { ApiRoutes } from '../../../app/api/routes';
import { FetchStatus, NameSpace } from '../../../app/consts';
import { DispatchStateExtra, State } from '../../../app/store/interfaces';
import { MakeAllRequired } from '../../../shared/interfaces';
import { CommentGet } from '../interfaces';
import { setReviews, setReviewsFetchStatus } from '../model/reducer';

export const fetchOfferReviews = createAsyncThunk<
  void,
  string,
  DispatchStateExtra
>(
  `${NameSpace.REVIEW}/fetchOfferReview`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setReviewsFetchStatus(FetchStatus.LOADING));

    const { data } = await api.get<CommentGet[]>(`${ApiRoutes.REVIEWS}/${id}`);

    dispatch(setReviewsFetchStatus(FetchStatus.SUCCESS));
    dispatch(setReviews(data));
  },
);

type CommentDto = MakeAllRequired<components['schemas']['CommentPost']>;

export const addOfferReview = createAsyncThunk<
  void,
  CommentDto & { offerId: string },
  DispatchStateExtra
>(
  `${NameSpace.REVIEW}/addOfferReview`,
  async ({ offerId, comment, rating }, { dispatch, getState, extra: api }) => {
    const { status } = await api.post<CommentDto[]>(
      `${ApiRoutes.REVIEWS}/${offerId}`,
      {
        comment,
        rating,
      },
    );

    const state = getState() as State;

    if (
      status === Number(StatusCodes.CREATED) &&
      state[NameSpace.OFFER].offer?.id === offerId
    ) {
      dispatch(fetchOfferReviews(offerId));
    }
  },
);
