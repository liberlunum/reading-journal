import { Box, Button, Menu, MenuItem, Paper, TextField } from '@mui/material';
import { useState } from 'react';
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

  const submitFilter = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (subject) searchParams.set('subject', subject);

    if (publishYear) searchParams.set('publish_date', publishYear);

    closeMenu();
  };

  const resetFilter = () => {
    searchParams.delete('subject');
    searchParams.delete('publish_date');
    setSubjcet('');
    setPublishYear('');
    closeMenu();
  };

  return (
    <>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={filterIconEl}
        open={Boolean(filterIconEl)}
        onClose={() => handleClose()}
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
          <Button onClick={event => resetFilter()}>Сбросить</Button>
          <Button onClick={submitFilter} variant="contained">
            Применить
          </Button>
        </Box>
      </Menu>
    </>
  );
}

export default FilterMenu;
