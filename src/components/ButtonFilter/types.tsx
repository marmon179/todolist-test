import { FilterType } from '../../types/types';

export type ButtonFilterPropsType = {
  filter: FilterType;
  onAllClickHandler: () => void;
  onActiveClickHandler: () => void;
  onCompletedClickHandler: () => void;
};
