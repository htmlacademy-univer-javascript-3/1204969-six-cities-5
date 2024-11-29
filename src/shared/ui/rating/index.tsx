import classNames from 'classnames';

type RatingProps = {
  rating: number;
  mode?: 'compact' | 'full';
  containerMix?: string;
  starsMix?: string;
};

export const Rating: React.FC<RatingProps> = ({
  rating,
  mode = 'full',
  containerMix,
  starsMix,
}) => {
  const isFullMode = mode === 'full';

  return (
    <div className={classNames(containerMix, 'rating')}>
      <div className={classNames(starsMix, 'rating__stars')}>
        <span style={{ width: `${20 * Math.trunc(rating)}%` }}></span>
        <span className="visually-hidden">Rating {rating}</span>
      </div>
      {Boolean(isFullMode) && (
        <span className="offer__rating-value rating__value">{rating}</span>
      )}
    </div>
  );
};
