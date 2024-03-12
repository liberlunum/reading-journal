import { Dispatch } from 'react';
import { UserType } from '../reducers/authReducer';
import { AuthAction, UserActionTypes } from '../reducers/authReducer';
export const Logout = () => {
  localStorage.removeItem('CurrentUser');
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: UserActionTypes.AUTH_LOGOUT,
    });
  };
};
export const Login = (prop: UserType) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: UserActionTypes.AUTH_LOGIN,
      payload: {
        activeUser: prop,
      },
    });
  };
};
