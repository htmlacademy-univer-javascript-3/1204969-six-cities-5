import { useEffect } from 'react';
import classNames from 'classnames';
import { OffersList } from '../../entities/OfferCard';
import { Header } from '../../features/Header';
import { Map } from '../../features/Map';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { cities } from '../../entities/City';
import { setCity, setOffers } from '../../app/store/actions';
import { offers as mockOffers } from '../../entities/OfferCard/mocks';

import styles from './style.module.css';
import { CitiesList } from '../../entities/City/ui/CitiesList';

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
        <div className="cities">
          <div
            className={classNames(
              'cities__places-container',
              'container',
              styles.gridContainer,
            )}
          >
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>

              <OffersList offers={offers} mix="cities__places-list" />
            </section>
            <div className="cities__right-section">
              <Map city={city} points={offers} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
