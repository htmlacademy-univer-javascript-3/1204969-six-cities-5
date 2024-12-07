import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AuthorizationStatus, NameSpace } from '../../../app/consts';
import { initAsyncActionsStore } from '../../../app/utils/mocks';
import { makeOffers } from '../lib/mocks';
import { OtherPlacesNearby } from './other-places-nearby';

describe('<OtherPlacesNearby />', () => {
  const { mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });
  });

  it('should render offers list and title inside of it', () => {
    const offers = makeOffers();

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <OtherPlacesNearby offers={offers} />
        </BrowserRouter>
      </Provider>
    );

    const { container } = render(component);

    expect(container.querySelector('.places__list')).toBeInTheDocument();
    expect(
      screen.getByText('Other places in the neighbourhood'),
    ).toBeInTheDocument();
  });
});
