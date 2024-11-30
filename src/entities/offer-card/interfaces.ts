import { components } from '../../../types/schema';
import { MakeAllRequired } from '../../shared/interfaces';
import { CityName } from '../city';

export type OfferType = 'Apartment' | 'Room';

export type OfferPreview = MakeAllRequired<
  components['schemas']['OfferPreview']
> & {
  location: MakeAllRequired<
    Exclude<components['schemas']['OfferPreview']['location'], undefined>
  >;
  city: MakeAllRequired<
    Exclude<components['schemas']['OfferPreview']['city'], undefined>
  > & {
    name: CityName;
  };
};

export type OfferMaximum = MakeAllRequired<
  components['schemas']['OfferMaximum']
> &
  OfferPreview;
