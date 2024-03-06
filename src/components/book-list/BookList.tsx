import { Book } from '../../types/books';
import BookItem from '../book-item/BookItem';
import { Box, Typography } from '@mui/material';
import style from './BookList.module.css';
import SkeletonBookItem from '../SkeletonBookItem/SkeletonBookItem';
import { useEffect } from 'react';

interface prop {
  books: Book[] | null;
  loading: boolean;
}

const skeletonArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function BookList({ books, loading }: prop) {
  useEffect(() => {
    console.log(!books);
  }, [books]);

  return (
    <Box className={style.BookList}>
      {loading ? (
        skeletonArr.map(el => <SkeletonBookItem key={el} />)
      ) : !books || books.length ? (
        books?.map(book => <BookItem key={book.key} book={book} />)
      ) : (
        <Typography className={style.BookList_empty} variant="h5">
          По вашму запросу ничего не найдено
        </Typography>
      )}
    </Box>
  );
}
export default BookList;
