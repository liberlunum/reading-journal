type AuthState = {
  activeUser?: {
    favourites?: object[];
    history?: object[];
    login?: string;
    password?: string;
  } | null;
};
const initialState: AuthState = {
  activeUser: null,
};
export enum AuthActionTypes {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR',
}

interface AuthLoginAction {
  type: AuthActionTypes.AUTH_LOGIN;
  payload: AuthState;
}
interface AuthLogoutAction {
  type: AuthActionTypes.AUTH_LOGOUT;
}
export type AuthAction = AuthLoginAction | AuthLogoutAction;

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
    default:
      return state;
  }
};
