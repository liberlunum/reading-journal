import styles from './Header.module.css';
import IconButton from '@mui/material/IconButton';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import HistoryEduTwoToneIcon from '@mui/icons-material/HistoryEduTwoTone';
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone';
import { Button, Tooltip } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { Logout, Login } from '../../state/action-creators/auth';
import Typography from '@mui/material/Typography';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { UserType } from '../../types/AuthTypes';

function Header() {
  const dispatch = useAppDispatch();
  const authedUserPush = useCallback(
    (userData: UserType) => {
      localStorage.setItem('CurrentUser', JSON.stringify(userData));
      dispatch(Login(userData));
    },
    [dispatch]
  );
  useEffect(() => {
    localStorage.getItem('CurrentUser') &&
      authedUserPush(JSON.parse(localStorage.getItem('CurrentUser') || ''));
  }, [authedUserPush]);
  const logInCheck = useTypedSelector(state => state.auth.activeUser);
  return (
    <div className={styles.container}>
      <Typography variant="h1" style={{ fontSize: '3rem' }}>
        <Link to="/" className={styles.linkHeader}>
          Reading journal
        </Link>
      </Typography>

      <div className={styles.iconContainer}>
        {!logInCheck && (
          <>
            <Link to="/signin">
              <Button>sign in</Button>
            </Link>
            <Link to="/signup">
              <Button>sign up</Button>
            </Link>
          </>
        )}
      </div>
      <div className={styles.iconContainer} style={{ minWidth: 260 }}>
        {logInCheck && <p>{logInCheck.login}</p>}
        {logInCheck && (
          <>
            <NavLink to="/search">
              <Tooltip title="Search">
                <IconButton aria-label="add to search">
                  <ManageSearchTwoToneIcon />
                </IconButton>
              </Tooltip>
            </NavLink>

            <Link to="/favorites">
              <Tooltip title="Favorites">
                <IconButton aria-label="add to favorites">
                  <FavoriteTwoToneIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Link to="/history">
              <Tooltip title="History">
                <IconButton aria-label="history">
                  <HistoryEduTwoToneIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/">
              <Tooltip title="Logout">
                <IconButton
                  onClick={() => {
                    dispatch(Logout());
                  }}
                  aria-label="logout"
                >
                  <LogoutTwoToneIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
