import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { components } from '../../../types/schema';
import {
  OfferMaximum,
  OfferPreview,
} from '../../entities/OfferCard/interfaces';
import { CommentGet } from '../../entities/Review/interfaces';
import { UserDto } from '../../entities/User/interfaces';
import { MakeAllRequired } from '../../shared/interfaces';
import { ApiRoutes } from '../api/routes';
import { dropToken, saveToken } from '../api/token';
import { AuthorizationStatus, FetchStatus } from '../consts';
import {
  setAuthorizationStatus,
  setOffer,
  setOfferLoadingStatus,
  setOffers,
  setOffersLoadingStatus,
  setReviews,
  setReviewsLoadingStatus,
  setUser,
} from './actions';
import { AppDispatch, State } from './interfaces';

type DispatchStateExtra = {
  dispatch: AppDispatch;
  getState: () => State;
  extra: AxiosInstance;
};

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  DispatchStateExtra
>('offers/fetch', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(FetchStatus.LOADING));

  const { data } = await api.get<OfferPreview[]>(ApiRoutes.OFFERS);

  dispatch(setOffersLoadingStatus(FetchStatus.SUCCESS));
  dispatch(setOffers(data));
});

export const checkLogin = createAsyncThunk<void, undefined, DispatchStateExtra>(
  'user/checkLogin',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setAuthorizationStatus(AuthorizationStatus.Unknown));

    const {
      status,
      data: { token, ...user },
    } = await api.get<AuthResponse>(ApiRoutes.LOGIN);

    if (status === Number(StatusCodes.OK)) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(user));
      saveToken(token);
    } else {
      // TODO: показывать сообщение об ошибке пользователю (бэк сообщает, что именно не так)
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

type AuthResponse = MakeAllRequired<components['schemas']['AuthInfoWithToken']>;

export const login = createAsyncThunk<void, UserDto, DispatchStateExtra>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    dispatch(setAuthorizationStatus(AuthorizationStatus.Unknown));

    const {
      status,
      data: { token, ...user },
    } = await api.post<AuthResponse>(ApiRoutes.LOGIN, {
      email,
      password,
    });

    if (status === Number(StatusCodes.CREATED)) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(user));
      saveToken(token);
    } else {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const logout = createAsyncThunk<void, undefined, DispatchStateExtra>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoutes.LOGOUT);
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(undefined));
    dropToken();
  },
);

export const fetchOffer = createAsyncThunk<void, string, DispatchStateExtra>(
  'offer/fetch',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferLoadingStatus(FetchStatus.LOADING));

    const { status, data } = await api.get<OfferMaximum>(
      `${ApiRoutes.OFFERS}/${id}`,
    );

    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setOfferLoadingStatus(FetchStatus.FAILURE));
      return;
    }

    dispatch(setOfferLoadingStatus(FetchStatus.SUCCESS));
    dispatch(setOffer(data));
  },
);

export const fetchOffersNearby = createAsyncThunk<
  void,
  string,
  DispatchStateExtra
>('offer/fetchNearbyOffers', async (id, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(FetchStatus.LOADING));

  const { data } = await api.get<OfferPreview[]>(
    `${ApiRoutes.OFFERS}/${id}/nearby`,
  );

  dispatch(setOffersLoadingStatus(FetchStatus.SUCCESS));
  dispatch(setOffers(data));
});

export const fetchOfferReviews = createAsyncThunk<
  void,
  string,
  DispatchStateExtra
>('offer/fetchReview', async (id, { dispatch, extra: api }) => {
  dispatch(setReviewsLoadingStatus(FetchStatus.LOADING));

  const { data } = await api.get<CommentGet[]>(`${ApiRoutes.REVIEWS}/${id}`);

  dispatch(setReviewsLoadingStatus(FetchStatus.SUCCESS));
  dispatch(setReviews(data));
});

type CommentDto = MakeAllRequired<components['schemas']['CommentPost']>;

export const addOfferReview = createAsyncThunk<
  void,
  CommentDto & { offerId: string },
  DispatchStateExtra
>(
  'offer/fetchReview',
  async ({ offerId, comment, rating }, { dispatch, getState, extra: api }) => {
    const { status } = await api.post<CommentDto[]>(
      `${ApiRoutes.REVIEWS}/${offerId}`,
      {
        comment,
        rating,
      },
    );

    const state = getState() as State;

    if (status === Number(StatusCodes.CREATED) && state.offer?.id === offerId) {
      dispatch(fetchOfferReviews(offerId));
    }
  },
);
