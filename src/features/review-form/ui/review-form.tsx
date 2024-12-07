import { useState } from 'react';

import { ReviewRating } from './review-rating';

type ReviewFormProps = {
  onSubmit: ({ rating, comment }: { rating: number; comment: string }) => void;
};

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit: submit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const isSubmitDisabled =
    rating === 0 || comment.length < 50 || comment.length > 300;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit({ rating, comment });

    setRating(0);
    setComment('');
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <ReviewRating value={rating} onChange={setRating} />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleTextChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
