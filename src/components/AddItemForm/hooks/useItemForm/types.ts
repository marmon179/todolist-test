import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { Nullable } from '../../../../types/Nullable';

export type useItemFormType = {
  title: string;
  error: Nullable<string>;
  setTitle: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<Nullable<string>>>;
  onTextFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
