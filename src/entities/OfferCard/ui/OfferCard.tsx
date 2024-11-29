import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { AuthorizationStatus } from '../../../app/consts';
import { AppRoutes } from '../../../app/routes';
import { setIsOfferFavorite } from '../../../app/store/api-actions';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { Rating } from '../../../shared/ui/Rating';
import { OfferPreview } from '../interfaces';

type Props = {
  onMouseOver?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  mode?: 'full' | 'compact';
  imgAlt?: string;
} & OfferPreview;

const imagesSize = {
  full: {
    width: 260,
    height: 200,
  },
  compact: {
    width: 150,
    height: 110,
  },
};

export const OfferCard: React.FC<Props> = ({
  id,
  isPremium,
  previewImage,
  rating = 0,
  imgAlt = 'Place image',
  price,
  title,
  type,
  onMouseOver,
  onMouseLeave,
  mode = 'full',
  isFavorite,
}) => {
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.authorizationStatus === AuthorizationStatus.Auth,
  );

  const onFavoriteClick = () => {
    dispatch(
      setIsOfferFavorite({
        offerId: id,
        isFavorite: !isFavorite,
        context: 'offers',
      }),
    );
  };

  if (!id) return null;

  const isFullMode = mode === 'full';

  return (
    <article
      className={classNames(
        isFullMode ? 'cities__card' : 'favorites__card',
        'place-card',
      )}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {Boolean(isPremium) && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={classNames(
          isFullMode ? 'cities__image-wrapper' : 'favorites__image-wrapper',
          'place-card__image-wrapper',
        )}
      >
        <Link to={`${AppRoutes.OFFER}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imagesSize[mode].width}
            height={imagesSize[mode].height}
            alt={imgAlt}
          />
        </Link>
      </div>
      <div
        className={classNames(
          {
            ['favorites__card-info']: !isFullMode,
          },
          'place-card__info',
        )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro; {price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {isAuthorized && (
            <button
              className={classNames('place-card__bookmark-button', 'button', {
                ['place-card__bookmark-button--active']: isFavorite,
              })}
              type="button"
              onClick={onFavoriteClick}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          )}
        </div>

        <Rating
          rating={rating}
          mode="compact"
          containerMix="place-card__rating"
          starsMix="place-card__stars"
        />

        <h2 className="place-card__name">
          <Link to={`${AppRoutes.OFFER}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};
