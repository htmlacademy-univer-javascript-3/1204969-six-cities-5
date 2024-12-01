import { AuthorizationStatus, NameSpace } from '../../../app/consts';
import { State } from '../../../app/store/interfaces';

export const getIsAuthenticated = (state: State) =>
  state[NameSpace.USER].authorizationStatus === AuthorizationStatus.AUTH;

export const getAuthorizationStatus = (state: State) =>
  state[NameSpace.USER].authorizationStatus;

export const getUser = (state: State) => state[NameSpace.USER].user;
