import BookList from '../book-list/BookList';
import SearchInput from '../search-input/SearchInput';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { eraseBooks, fetchBooks } from '../../state/action-creators/books';
import { Pagination } from '@mui/material';
import style from './SearchBooks.module.css';
import { useSearchParams } from 'react-router-dom';

function SearchBooks() {
  const { books, loading, numFound } = useTypedSelector(state => state.books);
  const dispatch: any = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [countOfPage, setCountOfpage] = useState(1);

  const searchBook = () => {
    dispatch(fetchBooks(searchParams.toString()));
  };

  const setPage = (page: number) => {
    searchParams.set('page', page + '');
    setSearchParams(searchParams);
  };

  const initSearchParams = () => {
    setSearchParams({
      limit: '12',
      page: '1',
    });
  };

  useEffect(() => {
    if (!searchParams.has('page')) {
      initSearchParams();
    }

    return () => {
      dispatch(eraseBooks());
    };
  }, []);

  useEffect(() => {
    if (numFound) {
      const limit = Number(searchParams.get('limit') || 1);
      setCountOfpage(Math.ceil(numFound / limit));
    }
  }, [numFound]);

  useEffect(() => {
    if (!searchParams.has('page')) {
      initSearchParams();
    } else if (searchParams.get('q')) {
      searchBook();
    }
  }, [searchParams]);

  return (
    <>
      <SearchInput />
      <BookList books={books} loading={loading} />
      {!!numFound && (
        <Pagination
          className={style.SearchBooks__pagination}
          count={countOfPage}
          page={Number(searchParams.get('page'))}
          onChange={(event, page) => {
            setPage(page);
          }}
        />
      )}
    </>
  );
}

export default SearchBooks;
