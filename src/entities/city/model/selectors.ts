import { NameSpace } from '../../../app/consts';
import { State } from '../../../app/store/interfaces';

export const getCity = (state: State) => state[NameSpace.CITY].city;
