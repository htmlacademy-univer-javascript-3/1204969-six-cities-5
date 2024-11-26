import classNames from 'classnames';
import { useMemo, useState } from 'react';

import { City } from '../../../entities/City';
import { Map } from '../../../entities/Map';
import { OfferCardEntity, OffersList } from '../../../entities/OfferCard';
import { Select } from '../../../shared/ui/Select';
import { sortVariants } from '../consts';
import { SortVariant } from '../interfaces';
import styles from './style.module.css';

type CityPlacesProps = { offers: OfferCardEntity[]; city: City };

export const CityPlaces: React.FC<CityPlacesProps> = ({ offers, city }) => {
  // FIXME: хранение стейта в этом компоненте вызывает ререндеры карты
  // 1. на изменение activeOfferId — это правильно, но подумать, как оптимизировать
  // 2. на изменение sortVariant ререндерить карту неправильно
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
