import { AuthAction } from '../state/reducers/authReducer';
import { BooksAction } from './books';
import { BooksSuggestAction } from './booksForSuggest';

export type ActionTypes = BooksAction | BooksSuggestAction | AuthAction;
