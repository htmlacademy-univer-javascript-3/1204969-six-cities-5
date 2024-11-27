import { components } from '../../../types/schema';
import { MakeAllRequired } from '../../shared/interfaces';

export type UserData = {
  logged: boolean;
  email?: string;
  avatarUrl?: string;
};

export type UserDataContext = {
  user: UserData;
  logout: () => void;
  login: (email: string, password: string) => boolean;
};

export type User = MakeAllRequired<components['schemas']['AuthInfo']>;

export type UserDto = MakeAllRequired<components['schemas']['User']>;
