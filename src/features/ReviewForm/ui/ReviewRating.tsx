import React from 'react';

const reviewStarsSpec = [
  { rating: 5, title: 'perfect' },
  { rating: 4, title: 'good' },
  { rating: 3, title: 'not bad' },
  { rating: 2, title: 'badly' },
  { rating: 1, title: 'terribly' },
];

type ReviewRatingProps = {
  value: number;
  onChange: (value: number) => void;
};

export const ReviewRating: React.FC<ReviewRatingProps> = ({
  value,
  onChange,
}) => (
  <div className="reviews__rating-form form__rating">
    {reviewStarsSpec.map(({ rating, title }) => (
      <React.Fragment key={title}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={rating}
          id={`${rating}-stars`}
          type="radio"
          checked={value >= rating}
          onClick={() => onChange(rating)}
          readOnly
        />
        <label
          htmlFor={`${rating}-stars`}
          className="reviews__rating-label form__rating-label"
          title={title}
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </React.Fragment>
    ))}
  </div>
);
