import classNames from 'classnames';
import { OfferCard, OfferCardEntity } from '..';

type OffersListProps = {
  offers: OfferCardEntity[];
  mix?: string;
  changeActiveOffer?: (id: OfferCardEntity['id'] | null) => void;
};

export const OffersList: React.FC<OffersListProps> = ({
  offers,
  mix,
  changeActiveOffer,
}) => (
  <div className={classNames('places__list', 'tabs__content', mix)}>
    {offers.map((place) => (
      <OfferCard
        {...place}
        key={place.id}
        onMouseOver={() => {
          changeActiveOffer?.(place.id);
        }}
        onMouseLeave={() => {
          changeActiveOffer?.(null);
        }}
      />
    ))}
  </div>
);
