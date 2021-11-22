import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react';

import { IconButton, TextField } from '@material-ui/core';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

import { Nullable } from '../../types/Nullable';

import { AddItemFormPropsType } from './types';

export const AddItemForm: FC<AddItemFormPropsType> = memo(({ addItem }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<Nullable<string>>(null);

  const addAnItem = (): void => {
    if (title.trim() !== '') {
      addItem(title);
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addAnItem();
    }
  };

  return (
    <div>
      <TextField
        variant="standard"
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addAnItem}>
        <AddBoxTwoToneIcon />
      </IconButton>
    </div>
  );
});
