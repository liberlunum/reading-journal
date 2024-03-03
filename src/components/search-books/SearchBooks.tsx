import BookList from '../book-list/BookList';
import SearchInput from '../search-input/SearchInput';
import { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../../state/action-creators/books';

function SearchBooks() {
  const { books, loading } = useTypedSelector(state => state.books);
  const dispatch: any = useDispatch();

  const searchBook = (query = 'any', sort = 'title', page = 1) => {
    dispatch(fetchBooks(query, sort, page));
  };

  useEffect(() => {
    searchBook();
  }, []);

  return (
    <>
      <SearchInput searchBooks={searchBook} />
      <BookList books={books} loading={loading} />
    </>
  );
}

export default SearchBooks;
