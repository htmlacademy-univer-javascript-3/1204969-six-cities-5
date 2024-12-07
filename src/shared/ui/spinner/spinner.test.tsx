import { render } from '@testing-library/react';

import { Spinner } from '.';
import styles from './styles.module.css';

describe('<Spinner />', () => {
  it('should render correctly', () => {
    const component = <Spinner />;

    const { container } = render(component);
    const spinner = container.firstChild as HTMLDivElement;

    expect(spinner?.classList.contains(String(styles.spinner))).toBe(true);
  });
});
