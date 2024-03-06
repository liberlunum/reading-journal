import { Box, Button, Menu, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import style from './FilterMenu.module.css';

interface prop {
  filterIconEl: any;
  handleClose: Function;
}

function FilterMenu({ filterIconEl, handleClose }: prop) {
  const [subject, setSubjcet] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const changeSubjcet = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSubjcet(event.target.value);
  };

  const changePublishYear = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPublishYear(event.target.value);
  };

  const closeMenu = () => {
    setSearchParams(searchParams);
    handleClose();
  };

  const submitFilter = () => {
    if (subject) searchParams.set('subject', subject);

    if (publishYear) searchParams.set('publish_year', publishYear);

    closeMenu();
  };

  const resetFilter = () => {
    searchParams.delete('subject');
    searchParams.delete('publish_year');
    setSubjcet('');
    setPublishYear('');
    closeMenu();
  };

  const onClose = (event: KeyboardEvent) => {
    if (event.code !== 'Tab') handleClose();
  };

  const submit = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitFilter();
    }
  };

  useEffect(() => {
    setSubjcet(searchParams.get('subject') || '');

    setPublishYear(searchParams.get('publish_year') || '');
  }, [searchParams]);

  return (
    <>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={filterIconEl}
        open={Boolean(filterIconEl)}
        onClose={onClose}
        onKeyDown={submit}
      >
        <Box className={style.FilterMenu__form}>
          <TextField
            className={style.FilterMenu__input}
            label="Жанр"
            value={subject}
            onChange={changeSubjcet}
          />
          <TextField
            className={style.FilterMenu__input}
            label="Год публикации"
            value={publishYear}
            onChange={changePublishYear}
          />
        </Box>
        <Box className={style.FilterMenu__button_group}>
          <Button onClick={resetFilter}>Сбросить</Button>
          <Button onClick={submitFilter} variant="contained">
            Применить
          </Button>
        </Box>
      </Menu>
    </>
  );
}

export default FilterMenu;
