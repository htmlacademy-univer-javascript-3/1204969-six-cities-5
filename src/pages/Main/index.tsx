import classNames from 'classnames';
import { useEffect, useMemo } from 'react';

import { FetchStatus } from '../../app/consts';
import { clearOffers } from '../../app/store/actions';
import { fetchOffers } from '../../app/store/api-actions';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { CitiesList } from '../../entities/City/ui/CitiesList';
import { Header } from '../../entities/Header';
import { CityPlaces } from '../../features/CityPlaces';
import { Spinner } from '../../shared/ui/Spinner';

export const MainPage: React.FC = () => {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const offersFetchStatus = useAppSelector((state) => state.offersFetchStatus);

  const dispatch = useAppDispatch();

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
