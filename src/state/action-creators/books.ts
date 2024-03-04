import { Dispatch } from 'react';
import { BooksAction, BooksActionTypes } from '../../types/books';

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
      console.log(e);
      dispatch({ type: BooksActionTypes.FETCH_BOOKS_ERROR, payload: 'Ошибка' });
    }
  };
};
