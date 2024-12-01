import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoutes } from '../../app/routes';
import { useAppSelector } from '../../app/store/hooks';
import { CityNames } from './interfaces';
import { getCity } from './model/selectors';

export const CitiesList = () => {
  const currentCity = useAppSelector(getCity);

  return (
    <ul className="locations__list tabs__list">
      {CityNames.map((cityName) => (
        <li className="locations__item" key={cityName}>
          <Link
            className={classNames(
              'locations__item-link',
              'tabs__item',
              currentCity.name === cityName && 'tabs__item--active',
            )}
            to={`${AppRoutes.HOME}#${cityName}`}
          >
            <span>{cityName}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
