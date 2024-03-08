import { Dispatch } from 'react';
import { AuthAction, AuthActionTypes } from '../reducers/authReducer';
export const Logout = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.AUTH_LOGOUT,
    });
  };
};
export const Login = (prop: object) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.AUTH_LOGIN,
      payload: {
        activeUser: prop,
      },
    });
  };
};
