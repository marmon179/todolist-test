import React, { ChangeEvent, useState } from 'react';

import { TextField } from '@material-ui/core';

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(
  ({ value, onChange }) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);

    const activateEditMode = (): void => {
      setEditMode(true);
      setTitle(value);
    };
    const activateViewMode = (): void => {
      setEditMode(false);
      onChange(title);
    };
    const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.currentTarget.value);
    };

    return editMode ? (
      <TextField
        value={title}
        onChange={changeTitle}
        autoFocus
        onBlur={activateViewMode}
      />
    ) : (
      <span onDoubleClick={activateEditMode}>{value}</span>
    );
  },
);
// type
type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};
