import { Dispatch } from 'react';
import {
  UserHistory,
  UserType,
  AuthAction,
  AuthActionTypes,
} from '../../types/AuthTypes';

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
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.ADD_HISTORY,
      payload: newHistoryItem,
    });
  };
};