import { combineReducers } from 'redux';
import { booksReducer } from './booksReducer';
import { booksForSuggestReducer } from './booksForSuggestReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  books: booksReducer,
  booksForSuggest: booksForSuggestReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
