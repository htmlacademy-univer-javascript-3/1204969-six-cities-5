import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Error404Page } from '../pages/Error';
import { FavoritesPage } from '../pages/Favorites';
import { LoginPage } from '../pages/Login';
import { MainPage } from '../pages/Main';
import { OfferPage } from '../pages/Offer';
import { Spinner } from '../shared/ui/Spinner';
import { AuthorizationStatus } from './consts';
import { LoggedRoute } from './LoggedRoute';
import { AppRoutes } from './routes';
import { checkLogin } from './store/api-actions';
import { useAppDispatch, useAppSelector } from './store/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  return authorizationStatus === AuthorizationStatus.Unknown ? (
    <Spinner />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.HOME} element={<MainPage />} />
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route
          path={AppRoutes.FAVORITES}
          element={
            <LoggedRoute>
              <FavoritesPage />
            </LoggedRoute>
          }
        />
        <Route path={`${AppRoutes.OFFER}/:id`} element={<OfferPage />} />
        <Route path={AppRoutes.NOT_FOUND} element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
};
