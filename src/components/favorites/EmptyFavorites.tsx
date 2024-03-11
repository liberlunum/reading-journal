import Typography from '@mui/material/Typography';
import customStyles from './customStyles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import React from 'react';

function EmptyFavorites() {
  return (
    <>
      <Typography sx={customStyles.typographyInEmpty}>
        Sorry, your favorites are empty
        <br />
        But we can start searching for books for you
        <br />
        You only need to click on this button:
      </Typography>
      <Link to="/search">
        <Button sx={customStyles.buttonForSearch}>Let`s go find books</Button>
      </Link>
    </>
  );
}
export default EmptyFavorites;
