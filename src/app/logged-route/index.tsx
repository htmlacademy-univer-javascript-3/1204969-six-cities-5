import { Navigate } from 'react-router-dom';

import { WithChildren } from '../../shared/interfaces';
import { AuthorizationStatus } from '../consts';
import { useAppSelector } from '../store/hooks';

export const LoggedRoute: React.FC<WithChildren> = ({ children }) => {
  const isAuthorizated = useAppSelector(
    (state) => state.authorizationStatus === AuthorizationStatus.Auth,
  );

  return isAuthorizated ? children : <Navigate to={'/login'} />;
};
