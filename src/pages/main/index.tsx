import classNames from 'classnames';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { FetchStatus } from '../../app/consts';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
  cities,
  CitiesList,
  CityName,
  CityNames,
  getCity,
  setCity,
} from '../../entities/city';
import { Header } from '../../entities/header';
import {
  clearOffers,
  fetchOffers,
  getOffers,
  getOffersFetchStatus,
} from '../../entities/offer-card';
import { CityPlaces } from '../../features/city-places';
import { Spinner } from '../../shared/ui/spinner';

export const MainPage: React.FC = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const city = useAppSelector(getCity);

  const offers = useAppSelector(getOffers);
  const offersFetchStatus = useAppSelector(getOffersFetchStatus);

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
