import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { OfferCardEntity } from '../entities/OfferCard';
import { offers } from '../entities/OfferCard/mocks';
import { UserContextProvider } from '../entities/User';
import { Error404Page } from '../pages/Error';
import { FavoritesPage } from '../pages/Favorites';
import { LoginPage } from '../pages/Login';
import { MainPage } from '../pages/Main';
import { OfferPage } from '../pages/Offer';
import { LoggedRoute } from './LoggedRoute';
import { AppRoutes } from './routes';
import { store } from './store';

type AppProps = {
  favoriteOfferIds: OfferCardEntity['id'][];
};

export const App: React.FC<AppProps> = ({ favoriteOfferIds }) => (
  <Provider store={store}>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.HOME} element={<MainPage />} />
          <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
          <Route
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
          />
          <Route path={`${AppRoutes.OFFER}/:id`} element={<OfferPage />} />
          <Route path={AppRoutes.NOT_FOUND} element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </Provider>
);
