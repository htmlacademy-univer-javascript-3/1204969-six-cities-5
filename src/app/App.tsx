import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { UserContextProvider } from '../entities/User';
import { Error404Page } from '../pages/Error';
import { LoginPage } from '../pages/Login';
import { MainPage } from '../pages/Main';
import { OfferPage } from '../pages/Offer';
import { AppRoutes } from './routes';
import { store } from './store';

export const App: React.FC = () => (
  <Provider store={store}>
    <UserContextProvider>
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
    </UserContextProvider>
  </Provider>
);
