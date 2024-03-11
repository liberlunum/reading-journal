import SearchInput from '../../components/search-input/SearchInput';
import { useEffect, useState } from 'react';
import style from './HomePage.module.css';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Skeleton } from '@mui/material';

interface IQuote {
  text: string;
  author: string;
}

const initialQuoteState = {
  text: 'Luck, I am your father',
  author: 'Dark Wayder',
};

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [quote, setQuote] = useState<IQuote>(initialQuoteState);

  async function fetchQuote() {
    try {
      setLoading(true);
      const response = await fetch(`https://type.fit/api/quotes`);
      const data = await response.json();
      const { text, author } = data[getRandomNumber(15)];
      setQuote({
        text,
        author,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gap: '50px',
        placeItems: 'center',
        height: '100%',
        marginBlockStart: '200px',
      }}
    >
      <Box>
        <Typography variant="h4">Hello, friend!</Typography>
        <Typography variant="h4">
          You found yourself on the page of a simple but convenient reader's
          diary
        </Typography>
        <Typography variant="h4">Let's try find something</Typography>
      </Box>
      <SearchInput />
      {loading ? (
        <Skeleton variant="rectangular" width={500} height={100} />
      ) : (
        <blockquote className={style.Quote}>
          <Typography variant="subtitle1">Random quote:</Typography>
          <p className={style.QuoteText}>{quote.text}</p>
          <cite className={style.QuoteAuthor}>{quote.author}</cite>
        </blockquote>
      )}
    </Box>
  );
}

export default Home;
