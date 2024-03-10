import { Dispatch } from 'react';
import { UserType } from '../reducers/authReducer';
import { AuthAction, AuthActionTypes } from '../reducers/authReducer';
export const Logout = () => {
  localStorage.removeItem('CurrentUser');
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.AUTH_LOGOUT,
    });
  };
};
export const Login = (prop: UserType) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.AUTH_LOGIN,
      payload: {
        activeUser: prop,
      },
    });
  };
};
