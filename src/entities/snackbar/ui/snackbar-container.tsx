import { useAppSelector } from '../../../app/store/hooks';
import { getSnackbarItems } from '../model/selectors';
import { Snackbar } from './snackbar';
import styles from './styles.module.css';

export const SnackbarContainer = () => {
  const items = useAppSelector(getSnackbarItems);

  return (
    <output className={styles.container}>
      {items.map((item) => (
        <Snackbar key={item.id} {...item} />
      ))}
    </output>
  );
};
