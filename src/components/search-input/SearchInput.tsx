import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import style from './SearchInput.module.css';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ClickAwayListener, Divider } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterMenu from '../filter-menu/FilterMenu';
import { Box } from '@mui/system';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchBooksForSuggest } from '../../state/action-creators/books';
import BookPopper from '../book-popper/BookPopper';
import { useAppDispatch } from '../../hooks/useAppDispatch';

function SearchInput() {
  const { books, loading } = useTypedSelector(state => state.booksForSuggest);
  const dispatch = useAppDispatch();
  const [timeout, setTime] = useState<NodeJS.Timeout | null>(null);
  const [searchString, setSearchString] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [popperEl, setPopperEl] = useState<null | HTMLElement>(null);
  const [filterIconEl, setFilterIconEl] = useState<null | HTMLElement>(null);
  const ref = useRef(null);

  const search = (event: MouseEvent | FormEvent) => {
    event.preventDefault();

    clearTime();
    setPopperEl(null);

    searchParams.set('q', searchString);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const openFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFilterIconEl(event.currentTarget);
  };

  const openPopper = useCallback(
    () => !!(books && (books.length || loading) && popperEl),
    [books, loading, popperEl]
  );

  const clearTime = () => {
    if (timeout) clearTimeout(timeout);
  };

  useEffect(() => {
    setSearchString(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    clearTime();

    setTime(
      setTimeout(() => {
        dispatch(fetchBooksForSuggest(`q=${searchString}`));
      }, 500)
    );
  }, [searchString]);

  useEffect(() => {
    return () => clearTime();
  });

  return (
    <div className={style.SearchInput}>
      <Paper
        ref={ref}
        component="form"
        onSubmit={search}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 500,
          position: 'relative',
        }}
      >
        <ClickAwayListener onClickAway={() => setPopperEl(null)}>
          <Box sx={{ display: 'flex', minWidth: '100%' }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              value={searchString}
              onChange={event => {
                setSearchString(event.currentTarget.value);
                if (!popperEl) setPopperEl(ref.current);
              }}
            />
            <IconButton
              onClick={openFilterMenu}
              sx={{ p: '10px' }}
              aria-label="directions"
            >
              <FilterAltIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              onClick={search}
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <FilterMenu
              filterIconEl={filterIconEl}
              handleClose={() => {
                setFilterIconEl(null);
              }}
            />
            <BookPopper
              popperEl={popperEl}
              openPopper={openPopper}
              books={books}
              loading={loading}
            />
          </Box>
        </ClickAwayListener>
      </Paper>
    </div>
  );
}

export default SearchInput;
