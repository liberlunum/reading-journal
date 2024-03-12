import Typography from '@mui/material/Typography';
import customFavoriteStyles from './customFavoriteStyles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function EmptyFavoritesList() {
  return (
    <>
      <Typography sx={customFavoriteStyles.typographyInEmpty}>
        Sorry, your favorites are empty
        <br />
        But we can start searching for books for you
        <br />
        You only need to click on this button:
      </Typography>
      <Link to="/search">
        <Button sx={customFavoriteStyles.buttonForSearch}>
          Let`s go find books
        </Button>
      </Link>
    </>
  );
}
export default EmptyFavoritesList;
