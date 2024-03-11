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
    case AuthActionTypes.ADD_FAVORITE:
      if (!state.activeUser) {
        return state;
      }

      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          favorites: [...state.activeUser.favorites, action.payload],
        },
      };
    case AuthActionTypes.DELETE_FAVORITE:
      if (!state.activeUser) {
        return state;
      }

      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          favorites: state.activeUser.favorites.filter(
            book => book !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
