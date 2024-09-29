import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { PlaceCardEntity } from './entities/PlaceCard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const places: PlaceCardEntity[] = [
  {
    isPremium: true,
    imgSrc: 'img/apartment-01.jpg',
    price: 120,
    rating: 4,
    name: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    imgSrc: 'img/room.jpg',
    price: 80,
    rating: 4,
    name: 'Wood and stone place',
    type: 'Room',
  },
  {
    imgSrc: 'img/apartment-02.jpg',
    price: 132,
    rating: 4,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    isPremium: true,
    imgSrc: 'img/apartment-03.jpg',
    price: 180,
    rating: 4,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  },
  {
    imgSrc: 'img/room.jpg',
    price: 80,
    rating: 4,
    name: 'Wood and stone plact',
    type: 'Room',
  },
];

root.render(
  <React.StrictMode>
    <App places={places} />
  </React.StrictMode>,
);
