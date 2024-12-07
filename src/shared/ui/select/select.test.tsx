import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from '.';

const options = ['1', '2', '3', '4'];
const value = '1';
const label = 'simple select';
const onChange = vitest.fn();

describe('<Select />', () => {
  it('should render label and current value', () => {
    const component = (
      <Select
        options={options}
        value={value}
        label={label}
        onChange={onChange}
      />
    );

    render(component);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it('should open options', async () => {
    const component = (
      <Select
        options={options}
        value={value}
        label={label}
        onChange={onChange}
      />
    );

    render(component);

    await userEvent.click(screen.getByText(value));

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should close options on option click and call onChange', async () => {
    const component = (
      <Select
        options={options}
        value={value}
        label={label}
        onChange={onChange}
      />
    );

    render(component);

    await userEvent.click(screen.getByText(value));
    await userEvent.click(screen.getByText('2'));

    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(onChange).toBeCalledWith('2');
  });
});
