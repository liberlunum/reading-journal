import BookList from '../../components/book-list/BookList';
import SearchInput from '../../components/search-input/SearchInput';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { eraseBooks, fetchBooks } from '../../state/action-creators/books';
import { Pagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import style from './SearchBooks.module.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AddHistory } from '../../state/action-creators/auth';

function SearchBooks() {
  const { books, loading, numFound } = useTypedSelector(state => state.books);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [countOfPage, setCountOfpage] = useState(1);

  const searchBook = () => {
    dispatch(
      AddHistory({
        url: window.location.href,
        time: new Date().getTime().toString(),
      })
    );
    dispatch(fetchBooks(searchParams.toString()));
  };

  const setPage = (page: number) => {
    searchParams.set('page', page + '');
    setSearchParams(searchParams);
  };

  const initSearchParams = () => {
    if (!searchParams.get('page')) searchParams.set('page', '1');
    if (!searchParams.get('limit')) searchParams.set('limit', '20');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!searchParams.has('page')) {
      dispatch(eraseBooks());
      initSearchParams();
    } else if (
      searchParams.has('q') ||
      searchParams.has('subject') ||
      searchParams.has('author_key') ||
      searchParams.has('first_publish_year')
    )
      searchBook();

    return () => dispatch(eraseBooks());
  }, [searchParams]);

  useEffect(() => {
    if (numFound) {
      const limit = Number(searchParams.get('limit') || 1);
      setCountOfpage(Math.ceil(numFound / limit));
    }
  }, [numFound]);

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
