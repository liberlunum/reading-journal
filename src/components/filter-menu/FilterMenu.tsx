import { Box, Button, Menu, TextField } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import style from './FilterMenu.module.css';
import { filterReducer, initalFilterState } from '../../reducers/filterReducer';
import { FilterState } from '../../types/filter';
import {
  ChangeSubject,
  ChangePublishYear,
  ResetFilters,
} from '../../action-creators/filter';

interface prop {
  filterIconEl: any;
  handleClose: Function;
}

function FilterMenu({ filterIconEl, handleClose }: prop) {
  const [filterState, dispatch] = useReducer(filterReducer, initalFilterState);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterKeys = Object.keys(filterState);

  const changeFilters = (value: string, filterKey: string) => {
    switch (filterKey) {
      case 'subject':
        dispatch(ChangeSubject(value));
        break;
      case 'first_publish_year':
        dispatch(ChangePublishYear(value));
        break;
    }
  };

  const closeMenu = () => {
    setSearchParams(searchParams);
    handleClose();
  };

  const submitFilter = () => {
    filterKeys.forEach(filterKey => {
      if (filterState[filterKey as keyof FilterState])
        searchParams.set(
          filterKey,
          filterState[filterKey as keyof FilterState].toString()
        );
    });

    closeMenu();
  };

  const resetFilter = () => {
    dispatch(ResetFilters());

    filterKeys.forEach(filterKey => {
      searchParams.delete(filterKey);
    });

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
    filterKeys.forEach(filterKey => {
      if (searchParams.get(filterKey))
        changeFilters(searchParams.get(filterKey) + '', filterKey);
    });
  }, []);

  return (
    <>
      <Menu
        anchorEl={filterIconEl}
        open={Boolean(filterIconEl)}
        onClose={onClose}
        onKeyDown={submit}
      >
        <Box className={style.FilterMenu__form}>
          {filterKeys.map(filter => (
            <TextField
              key={filter}
              className={style.FilterMenu__input}
              label={
                filter === 'subject' ? 'genre' : filter.replaceAll('_', ' ')
              }
              value={filterState[filter as keyof FilterState].replaceAll(
                ',',
                ', '
              )}
              onChange={event => changeFilters(event.target.value, filter)}
              size="small"
            />
          ))}
        </Box>
        <Box className={style.FilterMenu__button_group}>
          <Button onClick={resetFilter} size="small">
            Reset
          </Button>
          <Button onClick={submitFilter} variant="contained" size="small">
            Submit
          </Button>
        </Box>
      </Menu>
    </>
  );
}

export default FilterMenu;
