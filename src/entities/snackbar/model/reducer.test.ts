import { addSnackbarItem, removeSnackbarItem, snackbarSlice } from './reducer';

describe('snackbar slice', () => {
  it('should correct add snackbar item', () => {
    const initialState = {
      items: [],
    };

    const item = {
      id: '1',
      message: 'test',
    };

    const expectedState = { items: [item] };

    const result = snackbarSlice.reducer(initialState, addSnackbarItem(item));

    expect(result).toEqual(expectedState);
  });

  it('should correct remove snackbar item', () => {
    const item = {
      id: '1',
      message: 'test',
    };

    const initialState = {
      items: [item],
    };

    const expectedState = { items: [] };

    const result = snackbarSlice.reducer(
      initialState,
      removeSnackbarItem(item.id),
    );

    expect(result).toEqual(expectedState);
  });
});
