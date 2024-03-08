import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from './BookItem.module.css';
import { Checkbox, Skeleton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Book } from '../../types/books';

interface loadingTrue {
  loading: true;
}

interface loadingFalse {
  book: Book;
  loading: false;
}

type props = loadingFalse | loadingTrue;

function BookItem(props: props) {
  return (
    <Card className={style.BookItem} sx={{ maxWidth: 345 }}>
      {props.loading ? (
        <CardMedia className={style.BookItem__media}>
          <Skeleton
            sx={{ height: 330.4 }}
            animation="wave"
            variant="rectangular"
          />
        </CardMedia>
      ) : (
        <CardMedia
          className={style.BookItem__media}
          image={
            props.book.cover_edition_key
              ? `https://covers.openlibrary.org/b/olid/${props.book.cover_edition_key}-M.jpg`
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
      )}
      <CardContent>
        <Typography
          className={style.BookItem__title}
          gutterBottom
          component="div"
        >
          {props.loading ? <Skeleton /> : props.book.title}
        </Typography>
        <Typography
          className={style.BookItem__author}
          variant="body2"
          color="text.secondary"
        >
          {props.loading ? <Skeleton /> : props.book.author_name}
        </Typography>
      </CardContent>
      {!props.loading && (
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      )}
    </Card>
  );
}

export default BookItem;
