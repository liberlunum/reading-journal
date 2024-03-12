import { AuthAction, UserActionTypes } from '../reducers/authReducer';
import { Dispatch } from 'react';

export const addFavorites = (key: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: UserActionTypes.ADD_FAVORITE,
      payload: key,
    });
  };
};

export const deleteFavorites = (key: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: UserActionTypes.DELETE_FAVORITE,
      payload: key,
    });
  };
};
