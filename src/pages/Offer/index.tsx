import classNames from 'classnames';
import { Navigate, useParams } from 'react-router-dom';

import { OfferMaximum } from '../../entities/OfferCard/interfaces';
import { ReviewsList } from '../../entities/Review';
import { Header } from '../../features/Header';
import { OtherPlacesNearby } from '../../features/OtherPlacesNearby';
import { ReviewForm } from '../../features/ReviewForm';
import { Rating } from '../../shared/ui/Rating';
import styles from './styles.module.css';

export const OfferPage = () => {
  const { id } = useParams();

  // const offer: OfferMaximum = useMemo(() => {
  //   return offers.find(({ id: offerId }) => offerId === id);
  // }, [id]);
  const offer: OfferMaximum | null = null;

  if (window.isNaN(Number(id)) || !offer) {
    return <Navigate to={'/404'} />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {/* {offer.images?.map((image) => (
                <div
                  className="offer__image-wrapper"
                  key={`${image}-${Math.random()}`}
                >
                  <img className="offer__image" src={image} />
                </div>
              ))} */}
            </div>
          </div>

          <div
            className={classNames(
              'offer__container',
              'container',
              styles.offerContainer,
            )}
          >
            <div className="offer__wrapper">
              {/* {Boolean(offer.isPremium) && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )} */}
              <div className="offer__name-wrapper">
                {/* <h1
                  className="offer__name"
                  dangerouslySetInnerHTML={{ __html: offer.title ?? '' }}
                /> */}
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <Rating
                rating={4.8}
                containerMix="offer__rating"
                starsMix="offer__stars"
              />

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  Apartment
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;120</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">Wi-Fi</li>
                  <li className="offer__inside-item">Washing machine</li>
                  <li className="offer__inside-item">Towels</li>
                  <li className="offer__inside-item">Heating</li>
                  <li className="offer__inside-item">Coffee machine</li>
                  <li className="offer__inside-item">Baby seat</li>
                  <li className="offer__inside-item">Kitchen</li>
                  <li className="offer__inside-item">Dishwasher</li>
                  <li className="offer__inside-item">Cabel TV</li>
                  <li className="offer__inside-item">Fridge</li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by
                    the unique lightness of Amsterdam. The building is green and
                    from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <ReviewsList
                reviews={[
                  {
                    userName: 'Max',
                    userAvatarSrc: 'img/avatar-max.jpg',
                    rating: 4,
                    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
                    date: new Date('2019-04-24'),
                  },
                ]}
                containerMix="offer__reviews"
              />

              <ReviewForm />
            </div>
          </div>
          <section className={classNames('map', 'container', styles.offerMap)}>
            {/* <Map
              city={cities.Amsterdam!}
              points={[offer, ...offers.slice(0, 3)]}
            /> */}
          </section>
        </section>
        <div className="container">
          <OtherPlacesNearby />
        </div>
      </main>
    </div>
  );
};
