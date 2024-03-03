import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from './BookItem.module.css';
import { Book } from '../../types/books';
import { useTypedSelector } from '../hooks/useTypedSelector';

function BookItem({ book }: { book: Book }) {
  const { loading } = useTypedSelector(state => state.books);
  console.log(loading);

  return (
    <Card className={style.BookItem} sx={{ maxWidth: 345 }}>
      <CardMedia
        className={style.BookItem__media}
        component="img"
        alt=""
        image={
          book.cover_edition_key
            ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`
            : 'https://openlibrary.org/images/icons/avatar_book-sm.png'
        }
      />
      <CardContent>
        <Typography
          className={style.BookItem__title}
          gutterBottom
          variant="h5"
          component="div"
        >
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.author_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default BookItem;
