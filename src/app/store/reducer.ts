import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './actions';
import { State } from './interfaces';

const initialState: State = {};

const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    }),
);

export { reducer };
