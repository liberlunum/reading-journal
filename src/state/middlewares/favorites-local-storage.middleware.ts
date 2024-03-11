import { Middleware } from 'redux';
import { RootState } from '../reducers';
import { ActionTypes } from '../../types/ActionTypes';
import { UserActionTypes } from '../reducers/authReducer';

export const favoritesLocalStorage: Middleware<{}, RootState> =
  store => next => (action: ActionTypes) => {
    if (action.type === UserActionTypes.ADD_FAVORITE) {
      const activeUser = store.getState().auth.activeUser;

      if (!activeUser) {
        return;
      }

      next(action);
      localStorage.setItem('CurrentUser', JSON.stringify(activeUser));
    }

    next(action);
  };
