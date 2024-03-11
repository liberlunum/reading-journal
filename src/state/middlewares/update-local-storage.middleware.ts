import { Middleware } from 'redux';
import { RootState } from '../reducers';
import { ActionTypes } from '../../types/ActionTypes';
import { AuthActionTypes } from '../../types/AuthTypes';

export const UpdateLocalStorage: Middleware<{}, RootState> =
  store => next => (action: ActionTypes) => {
    next(action);
    if (
      action.type === AuthActionTypes.ADD_FAVORITE ||
      action.type === AuthActionTypes.DELETE_FAVORITE ||
      action.type === AuthActionTypes.ADD_HISTORY
    ) {
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
  };
