import { Middleware } from 'redux';
import { RootState } from '../reducers';
import { ActionTypes } from '../../types/ActionTypes';
import { UserActionTypes } from '../reducers/authReducer';

export const favoritesLocalStorage: Middleware<{}, RootState> =
  store => next => (action: ActionTypes) => {
    if (
      action.type === UserActionTypes.ADD_FAVORITE ||
      action.type === UserActionTypes.DELETE_FAVORITE
    ) {
      next(action);

      const activeUser = store.getState().auth.activeUser;

      if (!activeUser) {
        return;
      }
      const allUsersFromLS = JSON.parse(localStorage.getItem('Users')!);
      const updatedAllUsers = allUsersFromLS.map((user: any) => {
        if (user.login === activeUser.login) {
          return activeUser;
        } else {
          return user;
        }
      });

      console.log(activeUser, 'active user');
      localStorage.setItem('CurrentUser', JSON.stringify(activeUser));
      localStorage.setItem('Users', JSON.stringify(updatedAllUsers));

      return;
    }

    next(action);
  };
