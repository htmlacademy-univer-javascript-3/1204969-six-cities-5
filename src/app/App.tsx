import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Error404Page } from '../pages/Error';
import { LoginPage } from '../pages/Login';
import { MainPage } from '../pages/Main';
import { OfferPage } from '../pages/Offer';
import { AppRoutes } from './routes';
import { checkLogin } from './store/api-actions';
import { useAppDispatch } from './store/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.HOME} element={<MainPage />} />
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        {/* <Route
            path={AppRoutes.FAVORITES}
            element={
              <LoggedRoute>
                <FavoritesPage
                  offers={offers.filter((offer) =>
                    favoriteOfferIds.includes(offer.id),
                  )}
                />
              </LoggedRoute>
            }
          /> */}
        <Route path={`${AppRoutes.OFFER}/:id`} element={<OfferPage />} />
        <Route path={AppRoutes.NOT_FOUND} element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
};
