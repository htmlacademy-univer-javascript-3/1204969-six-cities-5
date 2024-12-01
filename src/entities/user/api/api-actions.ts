import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { components } from '../../../../types/schema';
import { ApiRoutes } from '../../../app/api/routes';
import { dropToken, saveToken } from '../../../app/api/token';
import { AuthorizationStatus } from '../../../app/consts';
import { DispatchStateExtra } from '../../../app/store/interfaces';
import { MakeAllRequired } from '../../../shared/interfaces';
import { UserDto } from '../interfaces';
import { setAuthorizationStatus, setUser } from '../model/reducer';

type AuthResponse = MakeAllRequired<components['schemas']['AuthInfoWithToken']>;

export const checkLogin = createAsyncThunk<void, undefined, DispatchStateExtra>(
  'user/checkLogin',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setAuthorizationStatus(AuthorizationStatus.UNKNOWN));

    const {
      status,
      data: { token, ...user },
    } = await api.get<AuthResponse>(ApiRoutes.LOGIN);

    if (status === Number(StatusCodes.OK)) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(setUser(user));
      saveToken(token);
    } else {
      // TODO: показывать сообщение об ошибке пользователю (бэк сообщает, что именно не так)
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    }
  },
);

export const login = createAsyncThunk<void, UserDto, DispatchStateExtra>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    dispatch(setAuthorizationStatus(AuthorizationStatus.UNKNOWN));

    const {
      status,
      data: { token, ...user },
    } = await api.post<AuthResponse>(ApiRoutes.LOGIN, {
      email,
      password,
    });

    if (status === Number(StatusCodes.CREATED)) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(setUser(user));
      saveToken(token);
    } else {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    }
  },
);

export const logout = createAsyncThunk<void, undefined, DispatchStateExtra>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoutes.LOGOUT);
    dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    dispatch(setUser(undefined));
    dropToken();
  },
);
