import classNames from 'classnames';

import styles from './style.module.css';
import { OfferCardEntity, OffersList } from '../../../entities/OfferCard';
import { Select } from '../../../shared/ui/Select';
import { Map } from '../../../entities/Map';
import { City } from '../../../entities/City';
import { useMemo, useState } from 'react';
import { SortVariant } from '../interfaces';
import { sortVariants } from '../consts';

type CityPlacesProps = { offers: OfferCardEntity[]; city: City };

export const CityPlaces: React.FC<CityPlacesProps> = ({ offers, city }) => {
  const [activeOfferId, setActiveOfferId] = useState<
    OfferCardEntity['id'] | null
  >(null);
  const [sortVariant, setSortVariant] = useState<SortVariant>(
    SortVariant.POPULAR,
  );

  const sortedOffers = useMemo(() => {
    switch (sortVariant) {
      case SortVariant.TOP_RATED:
        return offers.toSorted((a, b) => b.rating - a.rating);
      case SortVariant.HIGH_TO_LOW:
        return offers.toSorted((a, b) => b.price - a.price);
      case SortVariant.LOW_TO_HIGH:
        return offers.toSorted((a, b) => a.price - b.price);
      default:
        return offers;
    }
  }, [offers, sortVariant]);

  return (
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
          <b className="places__found">
            {offers.length} places to stay in {city.name}
          </b>
          <Select
            value={sortVariant}
            onChange={setSortVariant}
            options={sortVariants}
            label="Sort by"
          />

          <OffersList
            offers={sortedOffers}
            mix="cities__places-list"
            changeActiveOffer={setActiveOfferId}
          />
        </section>
        <div className="cities__right-section">
          <Map
            city={city}
            points={offers}
            selectedPointId={activeOfferId ?? undefined}
          />
        </div>
      </div>
    </div>
  );
};
