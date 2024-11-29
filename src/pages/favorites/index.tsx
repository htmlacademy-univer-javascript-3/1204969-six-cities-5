import { useEffect } from 'react';

import { FetchStatus } from '../../app/consts';
import { clearOffers } from '../../app/store/actions';
import { fetchFavoriteOffers } from '../../app/store/api-actions';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { Header } from '../../entities/header';
import { OffersByCities } from '../../entities/offer-card';
import { Spinner } from '../../shared/ui/spinner';

export const FavoritesPage = () => {
  const dispatch = useAppDispatch();

  const offers = useAppSelector((state) => state.offers);
  const offersFetchStatus = useAppSelector((state) => state.offersFetchStatus);

  useEffect(() => {
    dispatch(fetchFavoriteOffers());

    return () => {
      dispatch(clearOffers());
    };
  }, [dispatch]);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {offersFetchStatus !== FetchStatus.SUCCESS || !offers ? (
              <Spinner />
            ) : (
              <OffersByCities offers={offers} />
            )}
          </section>
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
};
