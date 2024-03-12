import { Dispatch } from 'react';
import { AuthAction, AuthActionTypes } from '../../types/AuthTypes';

export const addFavorites = (key: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.ADD_FAVORITE,
      payload: key,
    });
  };
};

export const deleteFavorites = (key: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.DELETE_FAVORITE,
      payload: key,
    });
  };
};
