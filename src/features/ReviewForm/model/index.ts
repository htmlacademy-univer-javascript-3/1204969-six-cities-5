import { useState } from 'react';

export const useReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const isSubmitDisabled = rating === 0 || text.length < 50;

  const submitForm = () => {
    // eslint-disable-next-line no-console
    console.log('Submit form', { rating, text });
  };

  return {
    rating,
    setRating,
    text,
    setText,
    isSubmitDisabled,
    submitForm,
  };
};
