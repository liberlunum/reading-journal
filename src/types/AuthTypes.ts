export type authType = {
  registerSwitch: boolean;
};
export type alertType = {
  show: boolean;
  login: string;
};
export interface AuthPrompt {
  login: string;
  password: string;
}
export type FormValues = {
  login: string;
  password: string;
};
export interface AuthState {
  activeUser: UserType | null;
}
export type UserType = {
  favorites: string[];
  history: string[];
  login: string;
  password: string;
};

export enum AuthActionTypes {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR',
}

export interface AuthLoginAction {
  type: AuthActionTypes.AUTH_LOGIN;
  payload: AuthState;
}
export interface AuthLogoutAction {
  type: AuthActionTypes.AUTH_LOGOUT;
}
export type AuthAction = AuthLoginAction | AuthLogoutAction;
