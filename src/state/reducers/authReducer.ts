import { AuthAction, AuthActionTypes, AuthState } from '../../types/AuthTypes';

const initialState: AuthState = {
  activeUser: null,
};
export enum UserActionTypes {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  ADD_FAVORITE = 'ADD_FAVORITE',
  DELETE_FAVORITE = 'DELETE_FAVORITE',
}

interface AddFavoritesAction {
  type: UserActionTypes.ADD_FAVORITE;
  payload: string;
}
interface DeleteFavoritesAction {
  type: UserActionTypes.DELETE_FAVORITE;
  payload: string;
}

export type FavoritesAction = AddFavoritesAction | DeleteFavoritesAction;

interface AuthLoginAction {
  type: UserActionTypes.AUTH_LOGIN;
  payload: AuthState;
}
interface AuthLogoutAction {
  type: UserActionTypes.AUTH_LOGOUT;
}
export type AuthAction = AuthLoginAction | AuthLogoutAction | FavoritesAction;

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case UserActionTypes.AUTH_LOGIN:
      return { activeUser: action.payload.activeUser };
    case UserActionTypes.AUTH_LOGOUT:
      return {
        activeUser: null,
      };
    case UserActionTypes.ADD_FAVORITE:
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
    case UserActionTypes.DELETE_FAVORITE:
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
