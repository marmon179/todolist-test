import { TaskType } from 'components/Todolist/types';

export type FilterType = 'all' | 'active' | 'completed';
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};
export type TasksStateType = {
  [key: string]: TaskType[];
};
