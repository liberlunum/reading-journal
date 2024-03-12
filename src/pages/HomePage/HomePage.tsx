import SearchInput from '../../components/search-input/SearchInput';
import { useEffect, useState } from 'react';
import style from './HomePage.module.css';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Skeleton } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

interface IQuote {
  text: string;
  author: string;
}

const initialQuoteState = {
  text: 'You shal not pass',
  author: 'Gandalf',
};

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [quote, setQuote] = useState<IQuote>(initialQuoteState);
  const [params, setParams] = useSearchParams();

  const user = JSON.parse(localStorage.getItem('CurrentUser')!);

  async function fetchQuote() {
    try {
      setLoading(true);
      const response = await fetch(`https://type.fit/api/quotes`);
      const data = await response.json();
      const { text, author } = data[getRandomNumber(15)];
      setQuote({
        text,
        author: author.replace(', type.fit', ''),
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
    setParams('');
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gap: '50px',
        placeItems: 'center',
        height: '100%',
        marginBlockStart: '100px',
      }}
    >
      <Box>
        <Typography variant="h4" className={style.HelloText}>
          Hello, {user?.login || 'friend'}!
        </Typography>
        {user || (
          <Typography variant="h4" width={700} className={style.HelloText}>
            You found yourself on the page of a simple but convenient reader's
            diary
          </Typography>
        )}
        <Typography variant="h4" className={style.HelloText}>
          Let's try to find something
        </Typography>
      </Box>
      <SearchInput />
      {loading ? (
        <Skeleton variant="rectangular" width={500} height={100} />
      ) : (
        <blockquote className={style.Quote}>
          <p className={style.QuoteText}>{`"${quote.text}"`}</p>
          <cite className={style.QuoteAuthor}>© {quote.author}</cite>
        </blockquote>
      )}
    </Box>
  );
}

export default Home;
