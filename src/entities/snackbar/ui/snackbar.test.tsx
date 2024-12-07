import { Action } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { initAsyncActionsStore } from '../../../app/utils/mocks';
import { removeSnackbarItem } from '../model/reducer';
import { Snackbar } from './snackbar';

const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('<Snackbar />', () => {
  const { mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  const item = {
    id: '1',
    message: 'test',
  };

  it('should render correctly', () => {
    const component = (
      <Provider store={store}>
        <Snackbar {...item} />
      </Provider>
    );

    const { container } = render(component);
    const snackItem = container.querySelector(
      `div[data-snackbar-id="${item.id}"]`,
    );

    expect(snackItem).toBeInTheDocument();
    expect(screen.getByText(item.message)).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('should call removeSnackbarItem on close click', async () => {
    const component = (
      <Provider store={store}>
        <Snackbar {...item} />
      </Provider>
    );

    render(component);

    await userEvent.click(screen.getByText('Close'));

    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([removeSnackbarItem.type]);
  });
});
