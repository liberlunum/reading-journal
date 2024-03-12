import React, { useEffect, useState } from 'react';
import styles from './Favorites.module.css';
import { Box, CardMedia, CircularProgress } from '@mui/material';
import customStyles from './customStyles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { FullBookInfo } from '../../types/books';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useBookNavigate } from '../../hooks/useBookNavigate';
import { deleteFavorites } from '../../state/action-creators/favorites';

function ShowFavorites() {
  const [books, setBooks] = useState<FullBookInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const activeUser = useTypedSelector(state => state.auth.activeUser);

  const navigate = useBookNavigate();
  const handleClick = (book: FullBookInfo) => {
    // navigate({
    //   key: book.key,
    //   title: book.title,
    //   author_name: [''], // TODO обсудить, что здесь нет этого поля
    // });
  };
  const deleteBook = (key: string) => {
    const id = key.replace('/works/', '');
    setBooks(prevState => prevState.filter(book => book.key !== id));
    dispatch(deleteFavorites(key));
  };

  useEffect(() => {
    if (!activeUser) {
      return;
    }

    const promises = activeUser.favorites.map(bookId =>
      fetch(` https://openlibrary.org/works/${bookId}.json`)
        .then(response => response.json())
        .catch()
    );
    Promise.all<any>(promises)
      .then(response => {
        const objBook = response.map(book => {
          return {
            ...book,
            key: book.key.replace('/works/', ''),
          };
        });
        setBooks(objBook);
      })
      .catch()
      .finally(() => setLoading(false));
  }, [activeUser]);

  return (
    <div className={styles.container}>
      {loading && (
        <Box sx={customStyles.box}>
          <CircularProgress variant="indeterminate" sx={customStyles.loader} />
        </Box>
      )}

      {books.map(book => {
        return (
          <Card key={book.key} sx={customStyles.card}>
            {!book.covers?.[0] && (
              <Typography sx={customStyles.typography}>
                "{book.title.slice(0, 22) + '..'}"
              </Typography>
            )}
            <IconButton
              onClick={() => deleteBook(book.key)}
              sx={customStyles.iconButton}
            >
              <FavoriteIcon />
            </IconButton>
            <CardMedia
              onClick={() => handleClick(book)}
              component="img"
              image={
                book.covers?.[0]
                  ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`
                  : 'https://openlibrary.org/images/icons/avatar_book-sm.png'
              }
              alt="обложка"
              sx={customStyles.cardMedia}
            />
          </Card>
        );
      })}
    </div>
  );
}

export default ShowFavorites;
