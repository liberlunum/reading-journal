import { Book } from '../../types/books';
import BookItem from '../book-item/BookItem';
import { Box } from '@mui/material';
import style from './BookList.module.css';
import SkeletonBookItem from '../SkeletonBookItem/SkeletonBookItem';

interface prop {
  books: Book[];
  loading: boolean;
}

const skeletonArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

function BookList({ books, loading }: prop) {
  return (
    <Box className={style.BookList}>
      {loading
        ? skeletonArr.map(el => <SkeletonBookItem key={el} />)
        : books.map(book => <BookItem key={book.key} book={book} />)}
    </Box>
  );
}
export default BookList;
