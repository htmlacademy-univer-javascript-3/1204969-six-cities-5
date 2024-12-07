import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ReviewRating } from './review-rating';

describe('<ReviewRating />', () => {
  it('should render correctly', () => {
    const onChange = vitest.fn();

    const component = <ReviewRating onChange={onChange} value={2} />;

    const { container } = render(component);

    expect(container.querySelector('.form__rating')).toBeInTheDocument();
    expect(container.querySelectorAll('.form__rating-input').length).toBe(5);
  });

  it('should render checked state correctly', () => {
    const onChange = vitest.fn();

    const component = <ReviewRating onChange={onChange} value={2} />;

    const { container } = render(component);

    expect(
      // inputs order reversed, so the 2nd rating has index 3
      container.querySelectorAll<HTMLInputElement>('.form__rating-input')[3]
        ?.checked,
    ).toBe(true);
  });

  it('should correctly call change state', async () => {
    const onChange = vitest.fn();

    const component = <ReviewRating onChange={onChange} value={2} />;

    const { container } = render(component);

    await userEvent.click(
      container.querySelectorAll<HTMLInputElement>('.form__rating-input')[1]!,
    );

    expect(onChange).toBeCalledWith(4);
  });
});
