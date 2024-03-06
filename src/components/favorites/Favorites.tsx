import React from 'react';
import styles from './Favorites.module.css';
import Card from '@mui/material/Card';
import { CardMedia } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { book } from './favoritesBook.mock';

function Favorites() {
  return (
    <div className={styles.container}>
      {book.map(book => {
        return (
          <Card
            key={book.id}
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
              image={book.cover}
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
