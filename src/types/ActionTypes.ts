import { AuthAction, FavoritesAction } from './AuthTypes';
import { BooksAction } from './books';
import { BooksSuggestAction } from './booksForSuggest';

export type ActionTypes =
  | BooksAction
  | BooksSuggestAction
  | AuthAction
  | FavoritesAction;
