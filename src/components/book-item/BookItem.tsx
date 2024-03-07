import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from './BookItem.module.css';
import { Checkbox } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Book } from '../../types/books';
import { Link } from 'react-router-dom';

function BookItem({ book }: { book: Book }) {
  const bookId = book.key.replace('/works/', '');

  return (
    <Card className={style.BookItem} sx={{ maxWidth: 345 }}>
      <CardMedia
        className={style.BookItem__media}
        image={
          book.cover_edition_key
            ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`
            : 'https://openlibrary.org/images/icons/avatar_book-sm.png'
        }
      >
        <Checkbox
          className={style.BookItem__media__icon}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          color="error"
        />
      </CardMedia>
      <CardContent>
        <Typography
          className={style.BookItem__title}
          gutterBottom
          component="div"
        >
          {book.title}
        </Typography>
        <Typography
          className={style.BookItem__author}
          variant="body2"
          color="text.secondary"
        >
          {book.author_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`../book/${bookId}`}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default BookItem;
