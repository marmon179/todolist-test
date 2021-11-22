import React, { FC, KeyboardEvent, memo } from 'react';

import { IconButton, TextField } from '@material-ui/core';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

import { useItemForm } from './hooks/useItemForm/useItemForm';
import { AddItemFormPropsType } from './types';

export const AddItemForm: FC<AddItemFormPropsType> = memo(({ addItem }) => {
  const { title, error, setTitle, setError, onTextFieldChange } = useItemForm();
  const onIconButtonClick = (): void => {
    if (title.trim() !== '') {
      addItem(title);
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onTextFieldKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      onIconButtonClick();
    }
  };

  return (
    <div>
      <TextField
        variant="standard"
        error={!!error}
        value={title}
        onChange={onTextFieldChange}
        onKeyPress={onTextFieldKeyPress}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={onIconButtonClick}>
        <AddBoxTwoToneIcon />
      </IconButton>
    </div>
  );
});
