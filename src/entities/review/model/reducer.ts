import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../../app/consts';
import { CommentGet } from '..';

export type State = {
  reviews?: CommentGet[];
  reviewsFetchStatus: FetchStatus;
};

const initialState: State = {
  reviewsFetchStatus: FetchStatus.INITIAL,
};

export const reviewSlice = createSlice({
  name: NameSpace.REVIEW,
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<CommentGet[]>) => {
      state.reviews = action.payload;
    },
    clearReviews: (state) => {
      state.reviews = undefined;
      state.reviewsFetchStatus = FetchStatus.INITIAL;
    },
    setReviewsLoadingStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.reviewsFetchStatus = action.payload;
    },
  },
});

export const { setReviews, clearReviews, setReviewsLoadingStatus } =
  reviewSlice.actions;
