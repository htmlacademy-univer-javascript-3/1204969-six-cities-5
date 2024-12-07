import { render } from '@testing-library/react';

import { Rating } from '.';

describe('<Rating />', () => {
  it('should render correctly', () => {
    const component = <Rating rating={2} />;

    const { container } = render(component);
    const rating = container.querySelector('.rating');
    const ratingStars = container.querySelector('.rating__stars');

    expect(rating).toBeInTheDocument();
    expect(ratingStars).toBeInTheDocument();
  });

  it('should render full mode correctly', () => {
    const component = <Rating rating={2} />;

    const { container } = render(component);
    const ratingValue = container.querySelector('.rating__value');

    expect(ratingValue).toBeInTheDocument();
  });
});
