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
    default:
      return state;
  }
};
