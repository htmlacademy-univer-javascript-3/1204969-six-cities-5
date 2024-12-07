import { useAppDispatch } from '../../../app/store/hooks';
import { SnackbarItem } from '../interfaces';
import { removeSnackbarItem } from '../model/reducer';
import styles from './styles.module.css';

export const Snackbar: React.FC<SnackbarItem> = ({ id, message }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(removeSnackbarItem(id));
  };

  return (
    <div data-snackbar-id={id} className={styles.item}>
      {message}
      <button onClick={handleClose}>Close</button>
    </div>
  );
};
