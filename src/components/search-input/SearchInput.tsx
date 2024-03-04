import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import style from './SearchInput.module.css';
import { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Divider } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterMenu from '../filter-menu/FilterMenu';

function SearchInput() {
  const [searchString, setSearchString] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterIconEl, setFilterIconEl] = useState<null | HTMLElement>(null);

  const search = (event: MouseEvent | FormEvent) => {
    event.preventDefault();
    searchParams.set('q', searchString);
    searchParams.set('page', '1');
    searchParams.delete('subject');
    setSearchParams(searchParams);
  };

  const openFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFilterIconEl(event.currentTarget);
  };

  return (
    <div className={style.SearchInput}>
      <Paper
        component="form"
        onSubmit={search}
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск"
          value={searchString}
          onChange={e => setSearchString(e.currentTarget.value)}
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
      </Paper>
    </div>
  );
}

export default SearchInput;
