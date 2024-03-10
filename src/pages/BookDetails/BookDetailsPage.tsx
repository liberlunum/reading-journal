import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SkeletonBookDetails from '../../components/SkeletonBookDetails/SkeletonBookDetails';
import { Box, Button, CardMedia, Rating } from '@mui/material';
import Typography from '@mui/material/Typography';
import style from './BookDetailsPage.module.css';
import { IBookDetails } from '../../types/books';

const initialBookState = {
  authors: '',
  title: '',
  rating: 0,
};

interface author {
  key: string;
}

interface authorItem {
  author: author;
}

export default function BookDetailsPage() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] =
    useState<IBookDetails>(initialBookState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [authorKey, setAuthorKey] = useState<string>('');

  const location = useLocation();
  const navigation = useNavigate();

  const defaultImage =
    'https://openlibrary.org/images/icons/avatar_book-sm.png';

  async function getBookDetails() {
    try {
      setLoading(true);
      const response = await fetch(`https://openlibrary.org/works/${id}.json`);
      const data = await response.json();
      const { title, description, covers, authors } = data;

      setAuthorKey(
        authors
          .map((authorItem: authorItem) =>
            authorItem.author.key.replace('/authors/', '')
          )
          .join(',')
      );
      
      const authors = location.state?.authors.join(', ') || 'no authors';
      let descriptionValue = 'no description...';
      let coverImage = defaultImage;


      if (description instanceof Object && description) {
        descriptionValue = description.value;
      } else if (description) {
        descriptionValue = description;
      }

      if (covers?.[0]) {
        coverImage = `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`;
      }

      const ratinResponse = await fetch(
        `https://openlibrary.org/works/${id}/ratings.json`
      );
      const ratingData = await ratinResponse.json();
      const rating = Number(ratingData.summary.average) || 0;

      setBookDetails({
        authors,
        title,
        description: descriptionValue,
        coverImage,
        rating,
      });

      setLoading(false);
    } catch (err) {
      setError(`Download Error`);
      setLoading(false);
    }
  }

  useEffect(() => {
    getBookDetails();
  }, [id]);

  return (
    <Box>
      {loading ? (
        <SkeletonBookDetails />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <Box
          sx={{ display: 'flex' }}
          gap={'7rem'}
          padding={'2rem 13rem 2rem 7rem'}
        >
          <CardMedia
            className={style.BookDetailsImage}
            component="img"
            sx={{ objectFit: 'contain' }}
            image={bookDetails.coverImage}
            alt={`${bookDetails.authors} - ${bookDetails.title}`}
            onError={({ currentTarget }) => {
              currentTarget.src = defaultImage;
            }}
          />
          <Box className={style.BookDetailsTextContent} width={'100%'}>
            <Typography variant="h2">{bookDetails.title}</Typography>
            <Typography variant="h3">{bookDetails.authors}</Typography>
            <Rating
              name="book-rating"
              value={bookDetails.rating}
              size="large"
              readOnly
              precision={0.5}
            />
            <Typography component="p" align="left">
              {bookDetails.description}
            </Typography>
            <Button
              size="large"
              variant="outlined"
              onClick={() => console.log('Add to favorites')}
            >
              Add to favorites
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={() =>
                navigation(`../search?limit=20&page=1&author_key=${authorKey}`)
              }
            >
              Another autor's books
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
