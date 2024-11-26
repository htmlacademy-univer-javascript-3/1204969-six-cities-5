import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './interfaces';
import { AxiosInstance } from 'axios';
import { setOffers, setOffersLoadingStatus } from './actions';
import { ApiRoutes } from '../api/routes';
import { OfferCardEntity } from '../../entities/OfferCard';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetch', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersLoadingStatus(true));

  const { data } = await api.get<OfferCardEntity[]>(ApiRoutes.OFFERS);

  dispatch(setOffersLoadingStatus(false));
  dispatch(setOffers(data));
});
