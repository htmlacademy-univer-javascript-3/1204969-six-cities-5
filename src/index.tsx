import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { offers } from './entities/OfferCard/mocks';
import { favoriteOfferIds } from './mocks/favorites';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offers={offers} favoriteOfferIds={favoriteOfferIds} />
  </React.StrictMode>,
);
