import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import style from './SearchInput.module.css';
import { FormEvent, useState } from 'react';

interface prop {
  searchParams: URLSearchParams;
  setSearchParams: Function;
}

function SearchInput({ searchParams, setSearchParams }: prop) {
  const [searchString, setSearchString] = useState('');

  const search = (event: MouseEvent | FormEvent) => {
    event.preventDefault();
    searchParams.set('q', searchString);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
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
          placeholder="Введите название книги"
          value={searchString}
          onChange={e => setSearchString(e.currentTarget.value)}
        />
        <IconButton
          onClick={search}
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default SearchInput;
