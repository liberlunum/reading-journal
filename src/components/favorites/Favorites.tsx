import React, { useEffect, useState } from 'react';
import styles from './Favorites.module.css';
import Card from '@mui/material/Card';
import { Box, CardMedia, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import customStyles from './customStyles';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useBookNavigate } from '../../hooks/useBookNavigate';
import { FullBookInfo } from '../../types/books';

function Favorites() {
  const [books, setBooks] = useState<FullBookInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const activeUser = useTypedSelector(state => {
    if (state.auth.activeUser) {
      state.auth.activeUser.favourites = [
        'works/OL863142W',
        'works/OL863642W',
        'works/OL860542W',
      ];
    }

    return state.auth.activeUser;
  });

  const navigate = useBookNavigate();
  const handleClick = (book: FullBookInfo) => {
    navigate({
      key: book.key,
      title: book.title,
      author_name: [''], // TODO обсудить, что здесь нет этого поля
    });
  };
  const deleteBook = (key: string) => {
    setBooks(prevState => prevState.filter(book => book.key !== key));
  };

  useEffect(() => {
    if (!activeUser?.favourites) {
      return;
    }

    const promises = activeUser?.favourites?.map(bookId =>
      fetch(` https://openlibrary.org/${bookId}.json`)
        .then(response => response.json())
        .catch()
    );
    Promise.all<any>(promises)
      .then(response => setBooks(response))
      .catch()
      .finally(() => setLoading(false));
  }, []);

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

export default Favorites;
