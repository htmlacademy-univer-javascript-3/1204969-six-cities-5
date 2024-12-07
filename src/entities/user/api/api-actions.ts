import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { components } from '../../../../types/schema';
import { ApiRoutes } from '../../../app/api/routes';
import { dropToken, saveToken } from '../../../app/api/token';
import { AuthorizationStatus, NameSpace } from '../../../app/consts';
import { DispatchStateExtra } from '../../../app/store/interfaces';
import { isAxiosError } from '../../../app/utils/is-axios-error';
import { MakeAllRequired } from '../../../shared/interfaces';
import { showSnackbar } from '../../snackbar';
import { UserDto } from '../interfaces';
import { setAuthorizationStatus, setUser } from '../model/reducer';

type AuthResponse = MakeAllRequired<components['schemas']['AuthInfoWithToken']>;

export const checkLogin = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${NameSpace.USER}/checkLogin`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setAuthorizationStatus(AuthorizationStatus.UNKNOWN));

    const response = await api.get<AuthResponse>(ApiRoutes.LOGIN);
    const {
      status,
      data: { token, ...user },
    } = response;

    if (status === Number(StatusCodes.OK)) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(setUser(user));
      saveToken(token);
    } else {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
      dropToken();
    }
  },
);

export const login = createAsyncThunk<void, UserDto, DispatchStateExtra>(
  `${NameSpace.USER}/login`,
  async ({ email, password }, { dispatch, extra: api }) => {
    dispatch(setAuthorizationStatus(AuthorizationStatus.UNKNOWN));

    const { status, data } = await api.post<AuthResponse>(ApiRoutes.LOGIN, {
      email,
      password,
    });

    if (status === Number(StatusCodes.CREATED)) {
      const { token, ...user } = data;

      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(setUser(user));
      saveToken(token);
    } else {
      const payload = data as unknown;

      const error = isAxiosError(payload) ? payload : null;
      const errorMessage = error?.details[0]?.messages[0];

      if (errorMessage) {
        showSnackbar(errorMessage);
      }

      dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    }
  },
);

export const logout = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${NameSpace.USER}/logout`,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoutes.LOGOUT);
    dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    dispatch(setUser(undefined));
    dropToken();
  },
);
