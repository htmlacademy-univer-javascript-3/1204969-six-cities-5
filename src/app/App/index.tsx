import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OfferCardEntity } from '../../entities/OfferCard';
import { MainPage } from '../../pages/Main';
import { LoginPage } from '../../pages/Login';
import { OfferPage } from '../../pages/Offer';
import { FavoritesPage } from '../../pages/Favorites';
import { Error404Page } from '../../pages/Error';
import { UserContextProvider } from '../../entities/User';
import { LoggedRoute } from '../../features/LoggedRoute';

type AppProps = {
  offers: OfferCardEntity[];
  favoriteOfferIds: OfferCardEntity['id'][];
};

export const App: React.FC<AppProps> = ({ offers, favoriteOfferIds }) => (
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage offers={offers} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
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
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
);
