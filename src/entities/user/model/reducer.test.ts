import { AuthorizationStatus } from '../../../app/consts';
import { makeUser } from '../utils/mocks';
import { setAuthorizationStatus, setUser, userSlice } from './reducer';

describe('user slice', () => {
  it('should correct change authorization status', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.AUTH,
    };

    const result = userSlice.reducer(
      initialState,
      setAuthorizationStatus(AuthorizationStatus.AUTH),
    );

    expect(result).toEqual(expectedState);
  });

  it('should correct set user', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
    };

    const user = makeUser();

    const expectedState = {
      ...initialState,
      user,
    };

    const result = userSlice.reducer(initialState, setUser(user));

    expect(result).toEqual(expectedState);
  });
});
