import { useState } from 'react';
import classNames from 'classnames';

export const Select = <T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  value: T;
  options: T[];
  onChange: (option: T) => void;
  label: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const chooseOption = (variant: T) => {
    onChange(variant);
    setIsOpen(false);
  };

  const toggleIsOptionsVisible = () => setIsOpen(!isOpen);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">{label} </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleIsOptionsVisible}
      >
        {value}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {options.map((option) => (
            <li
              className={classNames(
                'places__option',
                value === option && 'places__option--active',
              )}
              tabIndex={0}
              key={option}
              onClick={() => chooseOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};
