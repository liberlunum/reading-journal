import { Autocomplete, InputBase } from '@mui/material';
import { useState } from 'react';

type test = {
  test: any[];
  searchString: string;
  setSearchString: Function;
};

function AutocompleteEl({ test, searchString, setSearchString }: test) {
  const [str, setStr] = useState('');

  return (
    <Autocomplete
      //   className={style.Search__input__autocomplete}
      options={test}
      clearOnBlur={false}
      value={str}
      isOptionEqualToValue={(option, value) =>
        option.cover_edition_key == value.cover_edition_key
      }
      getOptionLabel={book => book.title || ''}
      // renderOption={(props, book) => (
      //   <Box component='li' {...props} key={book.key}>
      //     <BookItem book={book} />
      //   </Box>
      // )}
      renderInput={params => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <InputBase
            {...InputProps}
            {...rest}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Поиск"
            value={searchString}
            onChange={event => setSearchString(event.target.value)}
          />
        );
      }}
    />
  );
}

export default AutocompleteEl;
