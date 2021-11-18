import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { IconButton, TextField } from '@material-ui/core';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({ addItem }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

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
// type
type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
