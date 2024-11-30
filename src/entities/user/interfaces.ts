import { components } from '../../../types/schema';
import { MakeAllRequired } from '../../shared/interfaces';

export type User = MakeAllRequired<components['schemas']['AuthInfo']>;

export type UserDto = MakeAllRequired<components['schemas']['User']>;
