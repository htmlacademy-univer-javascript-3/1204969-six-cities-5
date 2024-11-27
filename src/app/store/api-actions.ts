import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { components } from '../../../types/schema';
import { OfferCardEntity } from '../../entities/OfferCard';
import { UserDto } from '../../entities/User/interfaces';
import { MakeAllRequired } from '../../shared/interfaces';
import { ApiRoutes } from '../api/routes';
import { dropToken, saveToken } from '../api/token';
import { AuthorizationStatus } from '../consts';
import {
  setAuthorizationStatus,
  setOffers,
  setOffersLoadingStatus,
  setUser,
} from './actions';
import { AppDispatch, State } from './interfaces';

type DispatchStateExtra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  DispatchStateExtra
>('offers/fetch', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(true));

  const { data } = await api.get<OfferCardEntity[]>(ApiRoutes.OFFERS);

  dispatch(setOffersLoadingStatus(false));
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
