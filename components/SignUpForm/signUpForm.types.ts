export type TInputsSignup = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

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
