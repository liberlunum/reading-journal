export interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_edition_key?: string;
}

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: null | string;
  numFound?: number;
}

export enum BooksActionTypes {
  FETCH_BOOKS = 'FETCH_BOOKS',
  FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS',
  FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR',
}

interface FetchBooksAction {
  type: BooksActionTypes.FETCH_BOOKS;
}

interface booksFetch {
  books: Book[];
  numFound: number;
}

interface FetchBooksSuccessAction {
  type: BooksActionTypes.FETCH_BOOKS_SUCCESS;
  payload: booksFetch;
}

interface FetchBooksErrorAction {
  type: BooksActionTypes.FETCH_BOOKS_ERROR;
  payload: string;
}

export type BooksAction =
  | FetchBooksAction
  | FetchBooksErrorAction
  | FetchBooksSuccessAction;
