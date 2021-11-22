import { ChangeEvent, useState } from 'react';

import { Nullable } from '../../../../types/Nullable';

import { useItemFormType } from './types';

export const useItemForm = (): useItemFormType => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<Nullable<string>>(null);

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  return { title, error, setTitle, setError, onTextFieldChange };
};
