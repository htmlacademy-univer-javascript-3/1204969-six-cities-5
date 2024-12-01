import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/consts';
import { cities } from '../const';
import { City } from '../interfaces';

export type State = {
  city: City;
};

const initialState: State = {
  city: cities.Paris,
};

export const citySlice = createSlice({
  name: NameSpace.CITY,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
  },
});

export const { setCity } = citySlice.actions;
