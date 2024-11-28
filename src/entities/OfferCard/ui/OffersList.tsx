import classNames from 'classnames';

import { setActiveOfferId } from '../../../app/store/actions';
import { useAppDispatch } from '../../../app/store/hooks';
import { OfferCard, OfferCardEntity } from '..';

type OffersListProps = {
  offers: OfferCardEntity[];
  mix?: string;
  shouldUpdateActiveOffer?: boolean;
};

export const OffersList: React.FC<OffersListProps> = ({
  offers,
  mix,
  shouldUpdateActiveOffer,
}) => {
  const dispatch = useAppDispatch();

  const changeActiveOffer = (id?: OfferCardEntity['id']) => {
    if (!shouldUpdateActiveOffer) return;
    dispatch(setActiveOfferId(id));
  };

  return (
    <div className={classNames('places__list', 'tabs__content', mix)}>
      {offers.length === 0 ? (
        <p>No places to stay available</p>
      ) : (
        offers.map((place) => (
          <OfferCard
            {...place}
            key={place.id}
            onMouseOver={() => {
              changeActiveOffer(place.id);
            }}
            onMouseLeave={() => {
              changeActiveOffer();
            }}
          />
        ))
      )}
    </div>
  );
};
