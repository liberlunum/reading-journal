import BookList from '../book-list/BookList';
import SearchInput from '../search-input/SearchInput';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../../state/action-creators/books';
import { Pagination } from '@mui/material';
import style from './SearchBooks.module.css';

function SearchBooks() {
  const { books, loading, numFound } = useTypedSelector(state => state.books);
  const dispatch: any = useDispatch();
  const [query, setQuery] = useState('any');
  const [page, setPage] = useState(1);
  const [countOfPage, setCountOfpage] = useState(1);

  const searchBook = (q = query, sort = 'title') => {
    dispatch(fetchBooks(q, sort, page));
  };

  useEffect(() => {
    searchBook();
  }, []);

  useEffect(() => {
    if (numFound) {
      setCountOfpage(Math.ceil(numFound / 12));
    }
  }, [numFound]);

  useEffect(() => {
    searchBook();
  }, [query, page]);

  return (
    <>
      <SearchInput setQuery={setQuery} />
      <BookList books={books} loading={loading} />
      <Pagination
        className={style.SearchBooks__pagination}
        count={countOfPage}
        onChange={(event, page) => {
          setPage(page);
        }}
      />
    </>
  );
}

export default SearchBooks;
