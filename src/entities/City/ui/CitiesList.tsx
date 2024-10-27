import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { cities } from '../const';
import { setCity } from '../../../app/store/actions';
import { CityName } from '../interfaces';

export const CitiesList = () => {
  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {(Object.getOwnPropertyNames(cities) as CityName[]).map((cityName) => (
        <li
          className="locations__item"
          key={cityName}
          onClick={() => dispatch(setCity(cities[cityName]))}
        >
          <a
            className={classNames(
              'locations__item-link',
              'tabs__item',
              currentCity?.name === cityName && 'tabs__item--active',
            )}
            href="#"
          >
            <span>{cityName}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
