import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Error404Page } from '../pages/error';
import { FavoritesPage } from '../pages/favorites';
import { LoginPage } from '../pages/login';
import { MainPage } from '../pages/main';
import { OfferPage } from '../pages/offer';
import { Spinner } from '../shared/ui/spinner';
import { AuthorizationStatus } from './consts';
import { LoggedRoute } from './logged-route';
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
