import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../types/ActionTypes';
import { composeWithDevTools } from '@redux-devtools/extension';
import { favoritesLocalStorage } from './middlewares/favorites-local-storage.middleware';

export const setupStore = () =>
  createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, favoritesLocalStorage))
  );

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = ThunkDispatch<AppStore, void, ActionTypes>;
