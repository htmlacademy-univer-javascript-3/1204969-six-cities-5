import { OfferCardEntity } from '../../entities/OfferCard';
import { Header } from '../../features/Header';
import { OffersByCities } from '../../features/OffersByCities';

type FavoritesPageProps = {
  offers: OfferCardEntity[];
};

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ offers }) => (
  <div className="page">
    <Header />

    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <OffersByCities offers={offers} />
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
