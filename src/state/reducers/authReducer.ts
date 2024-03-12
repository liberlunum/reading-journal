import { AuthAction, AuthActionTypes, AuthState } from '../../types/AuthTypes';

const initialState: AuthState = {
  activeUser: null,
};

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
              history: [action.payload, ...state.activeUser.history],
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
