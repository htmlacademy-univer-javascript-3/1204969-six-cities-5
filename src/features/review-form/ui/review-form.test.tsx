import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ReviewForm } from './review-form';

describe('<ReviewForm />', () => {
  it('should render correctly', () => {
    const onSubmit = vitest.fn();

    const component = <ReviewForm onSubmit={onSubmit} />;

    const { container } = render(component);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(container.querySelector('.reviews__form')).toBeInTheDocument();
  });

  it('button should be disabled by default', () => {
    const onSubmit = vitest.fn();

    const component = <ReviewForm onSubmit={onSubmit} />;

    const { container } = render(component);

    expect(
      container.querySelector<HTMLButtonElement>('button[type="submit"]')
        ?.disabled,
    ).toBe(true);
  });

  it('should call onSubmit with correct data', async () => {
    const onSubmit = vitest.fn();

    const component = <ReviewForm onSubmit={onSubmit} />;

    const { container } = render(component);

    await userEvent.click(
      container.querySelectorAll<HTMLInputElement>('.form__rating-input')[1]!,
    );
    await userEvent.click(container.querySelector('textarea')!);
    const textToPaste = Array.from({ length: 51 })
      .map(() => 'a')
      .join('');
    await userEvent.paste(textToPaste);

    expect(
      container.querySelector<HTMLButtonElement>('button[type="submit"]')
        ?.disabled,
    ).toBe(false);

    await userEvent.click(
      container.querySelector<HTMLButtonElement>('button[type="submit"]')!,
    );

    expect(onSubmit).toBeCalledWith({ rating: 4, comment: textToPaste });
  });
});
