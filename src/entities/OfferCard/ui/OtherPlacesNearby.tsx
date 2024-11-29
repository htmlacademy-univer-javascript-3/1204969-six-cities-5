import { OffersList } from '..';
import { OfferPreview } from '../interfaces';

type OtherPlacesNearbyProps = {
  offers: OfferPreview[];
};

export const OtherPlacesNearby: React.FC<OtherPlacesNearbyProps> = ({
  offers,
}) => (
  <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>

    <OffersList offers={offers} mix="near-places__list" />
  </section>
);
