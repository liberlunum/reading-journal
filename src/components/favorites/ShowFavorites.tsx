import React, { useEffect, useState } from 'react';
import styles from './Favorites.module.css';
import { Box, CardMedia, CircularProgress } from '@mui/material';
import customStyles from './customStyles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

function ShowFavorites() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const bookIds = ['works/OL863142W', 'works/OL863642W', 'works/OL860542W'];

  const deleteBook = (key: string) => {
    setBooks(prevState => prevState.filter(book => book.key !== key));
  };

  useEffect(() => {
    const promises = bookIds.map(bookId =>
      fetch(` https://openlibrary.org/${bookId}.json`)
        .then(response => response.json())
        .catch()
    );
    Promise.all(promises)
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
            <Link to={book.key}>
              <CardMedia
                component="img"
                image={
                  book.covers?.[0]
                    ? `https://covers.openlibrary.org/b/id/${book.covers?.[0]}-M.jpg`
                    : 'https://openlibrary.org/images/icons/avatar_book-sm.png'
                }
                alt="обложка"
                sx={customStyles.cardMedia}
              />
            </Link>
          </Card>
        );
      })}
    </div>
  );
}

export default ShowFavorites;
