import { render, screen } from '@testing-library/react';

import { dateToMonthWordYear } from '../../../shared/lib/date';
import { makeReview } from '../lib/mocks';
import { Review } from './review';

describe('<Review />', () => {
  it('should render correctly', () => {
    const review = makeReview();

    const component = <Review {...review} />;

    render(component);

    expect(screen.getByText(review.user.name!)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(
      screen.getByText(dateToMonthWordYear(new Date(review.date))),
    ).toBeInTheDocument();
  });
});
