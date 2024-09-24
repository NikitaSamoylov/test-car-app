export type AuthUser = {
  username: string;
  email: string;
  role: string;
  id: string;
  name?: undefined;
  image?: undefined;
};

export type TAuthSessionUser = {
  user: AuthUser;
};
  