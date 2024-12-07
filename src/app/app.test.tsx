import { render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';

import { cities } from '../entities/city';
import { makeOfferMaximum, makeOffers } from '../entities/offer-card/lib/mocks';
import { makeReviews } from '../entities/review/lib/mocks';
import { makeUser } from '../entities/user/lib/mocks';
import { App } from './app';
import { AuthorizationStatus, FetchStatus, NameSpace } from './consts';
import { HistoryRouter } from './history-route';
import { AppRoutes } from './routes';
import { initAsyncActionsStore } from './utils/mocks';

describe('<App />', () => {
  const { mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  let mockHistory: MemoryHistory;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: makeUser(),
      },
      [NameSpace.CITY]: {
        city: cities.Paris,
      },
      [NameSpace.OFFER]: {
        offers: makeOffers(),
        offersFetchStatus: FetchStatus.SUCCESS,
        offer: makeOfferMaximum(),
        offerFetchStatus: FetchStatus.SUCCESS,
      },
      [NameSpace.REVIEW]: {
        reviews: makeReviews(),
        reviewsFetchStatus: FetchStatus.SUCCESS,
      },
      [NameSpace.SNACKBAR]: {
        items: [],
      },
    });

    mockHistory = createMemoryHistory();
  });

  it('should render MainPage correctly', () => {
    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(AppRoutes.HOME);

    const { container } = render(component);

    expect(container.querySelector('.header')).toBeInTheDocument();
    expect(container.querySelector('.locations__list')).toBeInTheDocument();
    expect(container.querySelector('.cities')).toBeInTheDocument();
  });

  it('should render LoginPage correctly', () => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      [NameSpace.SNACKBAR]: {
        items: [],
      },
    });

    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(AppRoutes.LOGIN);

    const { container } = render(component);

    expect(container.querySelector('form.login__form')).toBeInTheDocument();
    expect(container.querySelectorAll('input').length).toBe(2);
  });

  it('should render LoginPage instead of FavoritesPage due to user is not authenticated', () => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      [NameSpace.SNACKBAR]: {
        items: [],
      },
    });

    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(AppRoutes.FAVORITES);

    const { container } = render(component);

    expect(container.querySelector('form.login__form')).toBeInTheDocument();
    expect(container.querySelectorAll('input').length).toBe(2);
  });

  it('should render FavoritesPage correctly', () => {
    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(AppRoutes.FAVORITES);

    const { container } = render(component);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(container.querySelector('.favorites__list')).toBeInTheDocument();
  });

  it('should render OfferPage correctly', () => {
    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(`${AppRoutes.OFFER}/1`);

    const { container } = render(component);

    expect(container.querySelector('.page__main--offer')).toBeInTheDocument();
  });

  it('should render Error404Page if offer was not provided', () => {
    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(AppRoutes.OFFER);

    render(component);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('not found')).toBeInTheDocument();
  });

  it('should render Error404Page route does not exist', () => {
    const component = (
      <Provider store={store}>
        <HistoryRouter history={mockHistory}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push('/123');

    render(component);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('not found')).toBeInTheDocument();
  });
});
