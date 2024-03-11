import styles from './Header.module.css';
import IconButton from '@mui/material/IconButton';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import HistoryEduTwoToneIcon from '@mui/icons-material/HistoryEduTwoTone';
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone';
import { Button, Tooltip } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <div className={styles.container}>
      <Typography variant="h1" style={{ fontSize: '3rem' }}>
        <Link to="/" className={styles.linkHeader}>
          Reading journal
        </Link>
      </Typography>

      <div className={styles.iconContainer}>
        <Link to="/signin">
          <Button>sign in</Button>
        </Link>
        <Link to="/signup">
          <Button>sign up</Button>
        </Link>
      </div>
      <div className={styles.iconContainer}>
        <p>UserName</p>

        <NavLink to="/search">
          <Tooltip title="Поиск">
            <IconButton aria-label="add to favorites">
              <ManageSearchTwoToneIcon />
            </IconButton>
          </Tooltip>
        </NavLink>
        <Link to="/favorites">
          <Tooltip title="Избранное">
            <IconButton aria-label="add to favorites">
              <FavoriteTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/history">
          <Tooltip title="История">
            <IconButton aria-label="history">
              <HistoryEduTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/">
          <Tooltip title="Выход">
            <IconButton aria-label="logout">
              <LogoutTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
    </div>
  );
}

export default Header;
