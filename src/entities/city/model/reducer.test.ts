import { cities } from '../const';
import { citySlice, setCity } from './reducer';

describe('city slice', () => {
  it('should correct change city', () => {
    const initialState = { city: cities.Paris };
    const expectedState = { city: cities.Brussels };

    const result = citySlice.reducer(initialState, setCity(cities.Brussels));

    expect(result).toEqual(expectedState);
  });
});
