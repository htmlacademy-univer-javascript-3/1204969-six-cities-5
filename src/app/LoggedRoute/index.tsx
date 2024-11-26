import { Navigate } from 'react-router-dom';

import { useUserContext } from '../../entities/User';
import { WithChildren } from '../../shared/interfaces';

export const LoggedRoute: React.FC<WithChildren> = ({ children }) => {
  const { user } = useUserContext();

  return user.logged ? children : <Navigate to={'/login'} />;
};
