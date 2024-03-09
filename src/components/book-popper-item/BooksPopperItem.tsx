import { Box, Skeleton, Typography } from '@mui/material';
import { Book } from '../../types/books';
import style from './BookPopperItmem.module.css';

type props = {
  book?: Book;
  loading: boolean;
};

function BookPopperItem({ book, loading }: props) {
  return (
    <Box className={style.BookPopperItem}>
      {loading ? (
        <Skeleton variant="rectangular" width={37} height={58} />
      ) : (
        <img
          className={style.BookPopperItem__img}
          src={
            book?.cover_edition_key
              ? `https://covers.openlibrary.org/b/olid/${book?.cover_edition_key}-S.jpg`
              : 'https://openlibrary.org/images/icons/avatar_book-sm.png'
          }
          alt=""
        />
      )}
      <Box className={style.BookPopperItem__content}>
        <Typography
          className={style.BookPopperItem__content__text}
          variant="subtitle1"
        >
          {loading ? <Skeleton /> : book?.title}
        </Typography>
        <Typography
          className={style.BookPopperItem__content__text}
          variant="body2"
        >
          {loading ? <Skeleton /> : book?.author_name}
        </Typography>
      </Box>
    </Box>
  );
}

export default BookPopperItem;
