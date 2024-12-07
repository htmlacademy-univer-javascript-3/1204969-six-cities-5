import { NameSpace } from '../../../app/consts';
import { State } from '../../../app/store/interfaces';

export const getSnackbarItems = (state: State) =>
  state[NameSpace.SNACKBAR].items;
