export interface AuthState {
  activeUser: UserType | null;
}

export type alertType = {
  registerErrorShow: boolean;
  uniqueErrorShow: boolean;
  login: string;
  loginErrorShow: boolean;
  passErrorShow: boolean;
};

export interface AuthPrompt {
  login: string;
  password: string;
}

export type FormValues = {
  login: string;
  password: string;
};

export interface UserHistory {
  url: string;
  time: string;
}

export type UserType = {
  favorites: string[];
  history: UserHistory[];
  login: string;
  password: string;
};

export enum AuthActionTypes {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  ADD_FAVORITE = 'ADD_FAVORITE',
  DELETE_FAVORITE = 'DELETE_FAVORITE',
  ADD_HISTORY = 'ADD_HISTORY',
}

interface AddHistoryAction {
  type: AuthActionTypes.ADD_HISTORY;
  payload: UserHistory;
}

interface AddFavoritesAction {
  type: AuthActionTypes.ADD_FAVORITE;
  payload: string;
}
interface DeleteFavoritesAction {
  type: AuthActionTypes.DELETE_FAVORITE;
  payload: string;
}

export type FavoritesAction = AddFavoritesAction | DeleteFavoritesAction;

interface AuthLoginAction {
  type: AuthActionTypes.AUTH_LOGIN;
  payload: AuthState;
}
interface AuthLogoutAction {
  type: AuthActionTypes.AUTH_LOGOUT;
}

export type AuthAction =
  | AuthLoginAction
  | AuthLogoutAction
  | AddHistoryAction
  | FavoritesAction;
