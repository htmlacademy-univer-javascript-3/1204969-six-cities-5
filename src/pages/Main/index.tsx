import { useEffect } from 'react';
import classNames from 'classnames';
import { Header } from '../../features/Header';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { cities } from '../../entities/City';
import { setCity, setOffers } from '../../app/store/actions';
import { offers as mockOffers } from '../../entities/OfferCard/mocks';
import { CitiesList } from '../../entities/City/ui/CitiesList';
import { CityPlaces } from '../../features/CityPlaces';

export const MainPage: React.FC = () => {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCity(cities.Paris));
    dispatch(setOffers(mockOffers));
  }, [dispatch]);

  if (!city || !offers) {
    return null;
  }

  return (
    <div className={classNames('page', 'page--gray', 'page--main')}>
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <CityPlaces offers={offers} city={city} />
      </main>
    </div>
  );
};
