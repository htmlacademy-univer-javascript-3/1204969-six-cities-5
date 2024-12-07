import { combineReducers } from '@reduxjs/toolkit';

import { citySlice } from '../../entities/city/model/reducer';
import { offerCardSlice } from '../../entities/offer-card/model/reducer';
import { reviewSlice } from '../../entities/review/model/reducer';
import { snackbarSlice } from '../../entities/snackbar/model/reducer';
import { userSlice } from '../../entities/user/model/reducer';
import { NameSpace } from '../consts';

export const reducer = combineReducers({
  [NameSpace.OFFER]: offerCardSlice.reducer,
  [NameSpace.USER]: userSlice.reducer,
  [NameSpace.CITY]: citySlice.reducer,
  [NameSpace.REVIEW]: reviewSlice.reducer,
  [NameSpace.SNACKBAR]: snackbarSlice.reducer,
});
