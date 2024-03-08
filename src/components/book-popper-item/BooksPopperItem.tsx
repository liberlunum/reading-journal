import { Box, Skeleton, Typography } from '@mui/material';
import { Book } from '../../types/books';
import style from './BookPopperItmem.module.css';

interface loadingTrue {
  loading: true;
}

interface loadingFalse {
  book: Book;
  loading: false;
}

type props = loadingFalse | loadingTrue;

function BookPopperItem(props: props) {
  return (
    <Box className={style.BookPopperItem}>
      {props.loading ? (
        <Skeleton variant="rectangular" width={37} height={58} />
      ) : (
        <img
          className={style.BookPopperItem__img}
          src={
            props.book.cover_edition_key
              ? `https://covers.openlibrary.org/b/olid/${props.book.cover_edition_key}-S.jpg`
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
          {props.loading ? <Skeleton /> : props.book.title}
        </Typography>
        <Typography
          className={style.BookPopperItem__content__text}
          variant="body2"
        >
          {props.loading ? <Skeleton /> : props.book.author_name}
        </Typography>
      </Box>
    </Box>
  );
}

export default BookPopperItem;
