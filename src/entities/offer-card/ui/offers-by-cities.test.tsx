import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AuthorizationStatus, NameSpace } from '../../../app/consts';
import { initAsyncActionsStore } from '../../../app/utils/mocks';
import { makeOffers } from '../lib/mocks';
import { OffersByCities } from './offers-by-cities';

describe('<OffersByCities />', () => {
  const { mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });
  });

  it('should render all given offers', () => {
    const offers = makeOffers();

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <OffersByCities offers={offers} />
        </BrowserRouter>
      </Provider>
    );

    const { container } = render(component);

    expect(container.querySelectorAll('.place-card').length).toBe(
      offers.length,
    );
  });

  it('should render empty state if offers = []', () => {
    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <OffersByCities offers={[]} />
        </BrowserRouter>
      </Provider>
    );

    render(component);

    expect(screen.getByText('No favorite offers yet')).toBeInTheDocument();
  });
});
