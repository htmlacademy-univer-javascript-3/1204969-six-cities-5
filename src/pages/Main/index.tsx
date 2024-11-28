import classNames from 'classnames';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { FetchStatus } from '../../app/consts';
import { clearOffers, setCity } from '../../app/store/actions';
import { fetchOffers } from '../../app/store/api-actions';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { cities, CityName } from '../../entities/City';
import { CityNames } from '../../entities/City/interfaces';
import { CitiesList } from '../../entities/City/ui/CitiesList';
import { Header } from '../../entities/Header';
import { CityPlaces } from '../../features/CityPlaces';
import { Spinner } from '../../shared/ui/Spinner';

export const MainPage: React.FC = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const city = useAppSelector((state) => state.city);

  const offers = useAppSelector((state) => state.offers);
  const offersFetchStatus = useAppSelector((state) => state.offersFetchStatus);

  useEffect(() => {
    const cityToSet = location.hash.slice(1) as CityName;

    if (!CityNames.includes(cityToSet)) return;

    dispatch(setCity(cities[cityToSet]));
  }, [dispatch, location.hash]);

  useEffect(() => {
    dispatch(fetchOffers());

    return () => {
      dispatch(clearOffers());
    };
  }, [dispatch]);

  const offersByCity = useMemo(
    () => (offers ?? []).filter((offer) => offer.city.name === city?.name),
    [city, offers],
  );

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
        {offersFetchStatus === FetchStatus.LOADING ? (
          <Spinner />
        ) : (
          <CityPlaces offers={offersByCity} city={city} />
        )}
      </main>
    </div>
  );
};
