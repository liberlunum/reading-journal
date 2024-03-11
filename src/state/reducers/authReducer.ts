export interface AuthState {
  activeUser: UserType | null;
}

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

const initialState: AuthState = {
  activeUser: null,
};

export enum AuthActionTypes {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  ADD_HISTORY = 'ADD_HISTORY',
  FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR',
}

interface AddHistoryAction {
  type: AuthActionTypes.ADD_HISTORY;
  payload: UserHistory;
}

interface AuthLoginAction {
  type: AuthActionTypes.AUTH_LOGIN;
  payload: AuthState;
}
interface AuthLogoutAction {
  type: AuthActionTypes.AUTH_LOGOUT;
}
export type AuthAction = AuthLoginAction | AuthLogoutAction | AddHistoryAction;

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.AUTH_LOGIN:
      return { activeUser: action.payload.activeUser };
    case AuthActionTypes.AUTH_LOGOUT:
      return {
        activeUser: null,
      };
    case AuthActionTypes.ADD_HISTORY:
      return state.activeUser
        ? {
            ...state,
            activeUser: {
              ...state.activeUser,
              history: [...state.activeUser.history, action.payload],
            },
          }
        : state;
    default:
      return state;
  }
};
