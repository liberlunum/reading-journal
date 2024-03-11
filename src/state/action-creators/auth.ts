import { Dispatch } from 'react';
import { UserHistory, UserType } from '../../types/AuthTypes';
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

export const AddHistory = (newHistoryItem: UserHistory) => {
  return (dispatch: Dispatch<AuthAction>, getState: Function) => {
    dispatch({
      type: AuthActionTypes.ADD_HISTORY,
      payload: newHistoryItem,
    });
  };
};
