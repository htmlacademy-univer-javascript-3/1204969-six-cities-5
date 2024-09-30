import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PlaceCardEntity } from '../../entities/PlaceCard';
import { MainPage } from '../../pages/Main';
import { LoginPage } from '../../pages/Login';
import { OfferPage } from '../../pages/Offer';
import { FavoritesPage } from '../../pages/Favorites';
import { Error404Page } from '../../pages/Error';
import { UserContextProvider } from '../../entities/User';
import { LoggedRoute } from '../../features/LoggedRoute';

type Props = {
  places: PlaceCardEntity[];
};

export const App: React.FC<Props> = ({ places }) => (
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage places={places} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <LoggedRoute>
              <FavoritesPage />
            </LoggedRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
);
