import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

export const Error404Page = () => (
  <div className={classNames('page', styles.errorPage)}>
    <h1 className={styles.errorMessage}>
      <span className={styles.statusCode}>404</span> not found
    </h1>
    <Link to="/" className={styles.linkBack}>
      ⬅️ На главную
    </Link>
  </div>
);
