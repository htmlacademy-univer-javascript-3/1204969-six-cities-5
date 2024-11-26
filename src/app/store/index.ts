import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '../api/axios-instance';
import { reducer } from './reducer';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(),
      },
    }),
});
