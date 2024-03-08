import { combineReducers } from 'redux';
import { booksReducer } from './booksReducer';
import { booksForSuggestReducer } from './booksForSuggestReducer';

export const rootReducer = combineReducers({
  books: booksReducer,
  booksForSuggest: booksForSuggestReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
