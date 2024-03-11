import { Book } from '../../types/books';
import BookItem from '../book-item/BookItem';
import { Box, Typography } from '@mui/material';
import style from './BookList.module.css';

interface prop {
  books: Book[] | null;
  loading: boolean;
}

const skeletonArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function BookList({ books, loading }: prop) {
  return (
    <Box className={style.BookList}>
      {loading
        ? skeletonArr.map(el => <BookItem key={el} loading={loading} />)
        : books?.map(book => (
            <BookItem key={book.key} book={book} loading={loading} />
          ))}
      {!!books && !books.length && (
        <Typography className={style.BookList_empty} variant="h5">
          Nothing was found for your query
        </Typography>
      )}
    </Box>
  );
}
export default BookList;
