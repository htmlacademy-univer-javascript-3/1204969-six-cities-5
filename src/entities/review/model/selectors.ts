import { NameSpace } from '../../../app/consts';
import { State } from '../../../app/store/interfaces';

export const getLatest10Reviews = (state: State) =>
  state[NameSpace.REVIEW].reviews
    ?.slice(0, 10)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getReviewsFetchStatus = (state: State) =>
  state[NameSpace.REVIEW].reviewsFetchStatus;
