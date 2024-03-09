import { Book, BooksState } from './books';

export type BooksForSuggestState = Omit<BooksState, 'numFound'>;

export enum BooksForSuggestActionTypes {
  FETCH_BOOKS_FOR_SUGGEST = 'FETCH_BOOKS_FOR_SUGGEST',
  FETCH_BOOKS_FOR_SUGGEST_SUCCESS = 'FETCH_BOOKS_FOR_SUGGEST_SUCCESS',
  FETCH_BOOKS_FOR_SUGGEST_ERROR = 'FETCH_BOOKS_FOR_SUGGEST_ERROR',
}

interface FetchBooksAction {
  type: BooksForSuggestActionTypes.FETCH_BOOKS_FOR_SUGGEST;
}

interface FetchBooksForSuggestSuccessAction {
  type: BooksForSuggestActionTypes.FETCH_BOOKS_FOR_SUGGEST_SUCCESS;
  payload: Book[];
}

interface FetchBooksErrorAction {
  type: BooksForSuggestActionTypes.FETCH_BOOKS_FOR_SUGGEST_ERROR;
  payload: string;
}

export type BooksSuggestAction =
  | FetchBooksAction
  | FetchBooksErrorAction
  | FetchBooksForSuggestSuccessAction;
