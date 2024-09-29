import { PlaceCardEntity } from '../../entities/PlaceCard';
import { MainPage } from '../../pages/Main';

type Props = {
  places: PlaceCardEntity[];
};

export const App: React.FC<Props> = ({ places }) => (
  <MainPage places={places} />
);
