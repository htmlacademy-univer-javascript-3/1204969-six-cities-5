import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OfferCardEntity } from '../entities/OfferCard';
import { MainPage } from '../pages/Main';
import { LoginPage } from '../pages/Login';
import { OfferPage } from '../pages/Offer';
import { FavoritesPage } from '../pages/Favorites';
import { Error404Page } from '../pages/Error';
import { UserContextProvider } from '../entities/User';
import { LoggedRoute } from './LoggedRoute';
import { AppRoutes } from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { offers } from '../entities/OfferCard/mocks';

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