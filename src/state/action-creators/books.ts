import { Dispatch } from 'react';
import { BooksAction, BooksActionTypes } from '../../types/books';

export const fetchBooks = (
  query = 'any',
  sort = 'title',
  page = 1,
  limit = 12
) => {
  return async (dispatch: Dispatch<BooksAction>) => {
    try {
      dispatch({ type: BooksActionTypes.FETCH_BOOKS });
      const q = query.split(' ').join('+');
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${q}&fields=key,title,author_name,cover_edition_key&sort=${sort}&limit=${limit}&page=${page}`
      );
      dispatch({
        type: BooksActionTypes.FETCH_BOOKS_SUCCESS,
        payload: (await response.json())['docs'],
      });
    } catch (e) {
      console.log(e);
      dispatch({ type: BooksActionTypes.FETCH_BOOKS_ERROR, payload: 'Ошибка' });
    }
  };
};
