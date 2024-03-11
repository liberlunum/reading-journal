import {
  BooksForSuggestState,
  BooksSuggestAction,
  BooksForSuggestActionTypes,
} from '../../types/booksForSuggest';

const initialState: BooksForSuggestState = {
  books: [],
  loading: false,
  error: null,
};

export const booksForSuggestReducer = (
  state = initialState,
  action: BooksSuggestAction
): BooksForSuggestState => {
  switch (action.type) {
    case BooksForSuggestActionTypes.FETCH_BOOKS_FOR_SUGGEST:
      return { ...state, loading: true };
    case BooksForSuggestActionTypes.FETCH_BOOKS_FOR_SUGGEST_SUCCESS:
      return { ...state, loading: false, books: action.payload };
    case BooksForSuggestActionTypes.FETCH_BOOKS_FOR_SUGGEST_ERROR:
      return { ...state, loading: false, error: action.payload, books: [] };
    default:
      return state;
  }
};
