import { Box, MenuItem, Popper } from '@mui/material';
import { Book } from '../../types/books';
import style from './BookPopper.module.css';
import BookPopperItem from '../book-popper-item/BooksPopperItem';
import { useBookNavigate } from '../../hooks/useBookNavigate';

type props = {
  popperEl: HTMLElement | null;
  openPopper: Function;
  books: Book[] | null;
  loading: boolean;
};

const skeletonArr = [1, 2, 3, 4, 5];

function BookPopper({ popperEl, openPopper, books, loading }: props) {
  const navigate = useBookNavigate();

  return (
    <Popper
      className={style.BookPopper}
      anchorEl={popperEl}
      open={openPopper()}
      sx={{ width: popperEl?.offsetWidth, zIndex: 2 }}
    >
      <Box>
        {loading
          ? skeletonArr.map(el => (
              <MenuItem key={el}>
                <BookPopperItem loading={loading} />
              </MenuItem>
            ))
          : books?.map(book => (
              <MenuItem
                key={book.key}
                onClick={() => navigate(book.key, book.author_name)}
              >
                <BookPopperItem book={book} loading={loading} />
              </MenuItem>
            ))}
      </Box>
    </Popper>
  );
}

export default BookPopper;
