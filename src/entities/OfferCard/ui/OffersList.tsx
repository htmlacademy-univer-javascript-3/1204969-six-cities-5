import classNames from 'classnames';
import { OfferCard, OfferCardEntity } from '..';
import { useState } from 'react';

type OffersListProps = { offers: OfferCardEntity[]; mix?: string };

export const OffersList: React.FC<OffersListProps> = ({ offers, mix }) => {
  const [, setActiveOfferId] = useState<OfferCardEntity['id'] | null>(null);

  return (
    <div className={classNames('places__list', 'tabs__content', mix)}>
      {offers.map((place) => (
        <OfferCard
          {...place}
          key={place.name}
          onMouseOver={() => {
            setActiveOfferId(place.id);
          }}
          onMouseLeave={() => {
            setActiveOfferId(null);
          }}
        />
      ))}
    </div>
  );
};
