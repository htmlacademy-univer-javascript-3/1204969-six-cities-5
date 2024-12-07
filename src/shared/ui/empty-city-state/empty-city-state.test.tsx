import { render, screen } from '@testing-library/react';

import { EmptyCityState } from '.';

describe('<EmptyCityState />', () => {
  it('should render correctly', () => {
    const component = <EmptyCityState cityName="Paris" />;

    render(component);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(
      screen.getByText(
        'We could not find any property available at the moment in Paris',
      ),
    ).toBeInTheDocument();
  });
});
