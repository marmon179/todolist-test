import React, { ChangeEvent, FC, memo, useState } from 'react';

import { TextField } from '@material-ui/core';

import { EditableSpanPropsType } from './types';

export const EditableSpan: FC<EditableSpanPropsType> = memo(({ value, onChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const onTitleDoubleClick = (): void => {
    setEditMode(true);
    setTitle(value);
  };
  const onTextFieldBlur = (): void => {
    setEditMode(false);
    onChange(title);
  };
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      value={title}
      onChange={onTitleChange}
      autoFocus
      onBlur={onTextFieldBlur}
    />
  ) : (
    <span onDoubleClick={onTitleDoubleClick}>{value}</span>
  );
});
