import { AuthAction } from '../state/reducers/authReducer';
import { BooksAction } from './books';
import { BooksSuggestAction } from './booksForSuggest';
import { FavoritesAction } from '../state/reducers/authReducer';

export type ActionTypes =
  | BooksAction
  | BooksSuggestAction
  | AuthAction
  | FavoritesAction;
