import React, { useEffect, useState } from 'react';
import styles from './Favorites.module.css';
import Card from '@mui/material/Card';
import { CardMedia } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { book } from './favoritesBook.mock';

function Favorites() {
  const [books, setBooks] = useState<any[]>([]);
  const bookIds = ['works/OL548432W', 'works/OL547432W', 'works/OL548532W'];

  useEffect(() => {
    const promises = bookIds.map(bookId =>
      fetch(` https://openlibrary.org/${bookId}.json`).then(response =>
        response.json()
      )
    );
    Promise.all(promises).then(response => setBooks(response));
  }, []);

  return (
    <div className={styles.container}>
      {books.map(book => {
        return (
          <Card
            key={book.key}
            sx={{
              width: 150,
              height: 230,
              position: 'relative',
              margin: 2,
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: -5,
                right: -5,
                zIndex: 1,
                color: '#C41E3A',
                opacity: 0.7,
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <FavoriteIcon />
            </IconButton>
            <CardMedia
              component="img"
              image={`https://covers.openlibrary.org/b/id/${book.covers?.[0]}-L.jpg`}
              alt="обложка"
              sx={{ width: '100%', height: '100%' }}
            />
          </Card>
        );
      })}
    </div>
  );
}

export default Favorites;
