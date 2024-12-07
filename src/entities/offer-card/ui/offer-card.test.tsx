import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AuthorizationStatus, NameSpace } from '../../../app/consts';
import { initAsyncActionsStore } from '../../../app/utils/mocks';
import { makeOfferPreview } from '../lib/mocks';
import { OfferCard } from './offer-card';

describe('<OfferCard />', () => {
  const { mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  it('should render with contexts correctly', () => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const offer = makeOfferPreview();

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard {...offer} />
        </BrowserRouter>
      </Provider>
    );

    const { container } = render(component);

    if (offer.isPremium) {
      expect(container.querySelector('.place-card__mark')).not.toBeNull();
    } else {
      expect(container.querySelector('.place-card__mark')).toBeNull();
    }
    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });

  it('should render favorite toggle if authenticated', () => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const offer = makeOfferPreview();

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <OfferCard {...offer} />
        </BrowserRouter>
      </Provider>
    );

    render(component);

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });
});
