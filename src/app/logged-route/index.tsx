import { Navigate } from 'react-router-dom';

import { getIsAuthenticated } from '../../entities/user';
import { WithChildren } from '../../shared/interfaces';
import { useAppSelector } from '../store/hooks';

export const LoggedRoute: React.FC<WithChildren> = ({ children }) => {
  const isAuthorizated = useAppSelector(getIsAuthenticated);

  return isAuthorizated ? children : <Navigate to={'/login'} />;
};
