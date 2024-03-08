import { Dispatch } from 'react';
import { BooksAction, BooksActionTypes } from '../../types/books';
import {
  BooksForSuggestActionTypes,
  BooksSuggestAction,
} from '../../types/booksForSuggest';

export const fetchBooks = (params: string) => {
  return async (dispatch: Dispatch<BooksAction>) => {
    try {
      dispatch({ type: BooksActionTypes.FETCH_BOOKS });
      const response = await fetch(
        `https://openlibrary.org/search.json?${params}&fields=key,title,author_name,cover_edition_key`
      );
      const json = await response.json();
      dispatch({
        type: BooksActionTypes.FETCH_BOOKS_SUCCESS,
        payload: {
          books: json.docs,
          numFound: json.numFound,
        },
      });
    } catch (e) {
      dispatch({ type: BooksActionTypes.FETCH_BOOKS_ERROR, payload: 'Ошибка' });
    }
  };
};

export const fetchBooksForSuggest = (params: string) => {
  return async (dispatch: Dispatch<BooksSuggestAction>) => {
    try {
      dispatch({ type: BooksForSuggestActionTypes.FETCH_BOOKS_FOR_SUGGEST });
      const response = await fetch(
        `https://openlibrary.org/search.json?${params}&fields=key,title,author_name,cover_edition_key&limit=5&page=1`
      );
      const json = await response.json();
      dispatch({
        type: BooksForSuggestActionTypes.FETCH_BOOKS_FOR_SUGGEST_SUCCESS,
        payload: json.docs,
      });
    } catch (e) {
      dispatch({
        type: BooksForSuggestActionTypes.FETCH_BOOKS_FOR_SUGGEST_ERROR,
        payload: 'Ошибка',
      });
    }
  };
};

export const eraseBooks = () => {
  return (dispatch: Dispatch<BooksAction>) => {
    dispatch({
      type: BooksActionTypes.FETCH_BOOKS_SUCCESS,
      payload: {
        books: null,
        numFound: 0,
      },
    });
  };
};
