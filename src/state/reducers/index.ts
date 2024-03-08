import { combineReducers } from 'redux';
import { booksReducer } from './booksReducer';
import { authReducer } from './authReducer';
export const rootReducer = combineReducers({
  books: booksReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
