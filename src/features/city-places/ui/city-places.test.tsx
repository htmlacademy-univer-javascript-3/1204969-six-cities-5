import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AuthorizationStatus, NameSpace } from '../../../app/consts';
import { initAsyncActionsStore } from '../../../app/utils/mocks';
import { cities } from '../../../entities/city';
import { makeOffers } from '../../../entities/offer-card/lib/mocks';
import { SortVariant } from '../interfaces';
import { CityPlaces } from './city-places';

describe('<CityPlaces />', () => {
  const { mockStoreCreator } = initAsyncActionsStore();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      [NameSpace.OFFER]: {
        activeOfferId: undefined,
      },
    });
  });

  it('should render correctly', () => {
    const offers = makeOffers();

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <CityPlaces city={cities.Paris} offers={offers} />
        </BrowserRouter>
      </Provider>
    );

    const { container } = render(component);

    expect(container.querySelector('.cities')).toBeInTheDocument();
    expect(container.querySelector('.cities__places')).toBeInTheDocument();
  });

  it('should render empty state if offers is empty', () => {
    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <CityPlaces city={cities.Paris} offers={[]} />
        </BrowserRouter>
      </Provider>
    );

    render(component);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render first offer of array if default order', () => {
    const offers = makeOffers();

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <CityPlaces city={cities.Paris} offers={offers} />
        </BrowserRouter>
      </Provider>
    );

    const { container } = render(component);

    const firstOfferId: string =
      container.querySelector<HTMLElement>('.place-card[data-offer-id]')
        ?.dataset.offerId ?? '-1';
    const targetOfferId = offers[0]?.id ?? -1;

    expect(firstOfferId).toBe(targetOfferId);
  });

  it('should render most rated offer of array if top rated sorting', async () => {
    const offers = makeOffers();

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <CityPlaces city={cities.Paris} offers={offers} />
        </BrowserRouter>
      </Provider>
    );

    const { container } = render(component);

    await userEvent.click(container.querySelector('.places__sorting-type')!);

    const sortingOptions = container.querySelectorAll('.places__option');
    let sortingOptionIndex = -1;
    sortingOptions.forEach((option, index) => {
      if (option.textContent === SortVariant.TOP_RATED) {
        sortingOptionIndex = index;
      }
    });
    await userEvent.click(
      container.querySelectorAll('.places__option')[sortingOptionIndex]!,
    );

    const firstOfferId: string =
      container.querySelector<HTMLElement>('.place-card[data-offer-id]')
        ?.dataset.offerId ?? '-1';
    const targetOfferId =
      offers.toSorted((a, b) => b.rating - a.rating)[0]?.id ?? -1;

    expect(firstOfferId).toBe(targetOfferId);
  });

  it('should render most expensive offer of array if most expensive sorting', async () => {
    const offers = makeOffers();

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <CityPlaces city={cities.Paris} offers={offers} />
        </BrowserRouter>
      </Provider>
    );

    const { container } = render(component);

    await userEvent.click(container.querySelector('.places__sorting-type')!);

    const sortingOptions = container.querySelectorAll('.places__option');
    let sortingOptionIndex = -1;
    sortingOptions.forEach((option, index) => {
      if (option.textContent === SortVariant.HIGH_TO_LOW) {
        sortingOptionIndex = index;
      }
    });
    await userEvent.click(
      container.querySelectorAll('.places__option')[sortingOptionIndex]!,
    );

    const firstOfferId: string =
      container.querySelector<HTMLElement>('.place-card[data-offer-id]')
        ?.dataset.offerId ?? '-1';
    const targetOfferId =
      offers.toSorted((a, b) => b.price - a.price)[0]?.id ?? -1;

    expect(firstOfferId).toBe(targetOfferId);
  });

  it('should render most cheap offer of array if most cheap sorting', async () => {
    const offers = makeOffers();

    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <CityPlaces city={cities.Paris} offers={offers} />
        </BrowserRouter>
      </Provider>
    );

    const { container } = render(component);

    await userEvent.click(container.querySelector('.places__sorting-type')!);

    const sortingOptions = container.querySelectorAll('.places__option');
    let sortingOptionIndex = -1;
    sortingOptions.forEach((option, index) => {
      if (option.textContent === SortVariant.LOW_TO_HIGH) {
        sortingOptionIndex = index;
      }
    });
    await userEvent.click(
      container.querySelectorAll('.places__option')[sortingOptionIndex]!,
    );

    const firstOfferId: string =
      container.querySelector<HTMLElement>('.place-card[data-offer-id]')
        ?.dataset.offerId ?? '-1';
    const targetOfferId =
      offers.toSorted((a, b) => a.price - b.price)[0]?.id ?? -1;

    expect(firstOfferId).toBe(targetOfferId);
  });
});
