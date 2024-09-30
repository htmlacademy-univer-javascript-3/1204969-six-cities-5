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
