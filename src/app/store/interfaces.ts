import { AxiosInstance } from 'axios';

import { store } from '.';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type DispatchStateExtra = {
  dispatch: AppDispatch;
  getState: () => State;
  extra: AxiosInstance;
};
