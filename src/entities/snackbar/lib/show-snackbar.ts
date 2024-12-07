import { store } from '../../../app/store';
import { randomId } from '../../../shared/lib/random-id';
import { SNACKBAR_TIMEOUT } from '../consts';
import { SnackbarItem } from '../interfaces';
import { addSnackbarItem, removeSnackbarItem } from '../model/reducer';

export const showSnackbar = (message: SnackbarItem['message']) => {
  const id = randomId();

  store.dispatch(addSnackbarItem({ message, id }));

  setTimeout(() => {
    store.dispatch(removeSnackbarItem(id));
  }, SNACKBAR_TIMEOUT);
};
