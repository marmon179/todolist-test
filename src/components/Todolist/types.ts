import { FilterType } from '../../types/types';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodoListPropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  changeFilter: (value: FilterType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void;
  deleteTask: (taskId: string, todoListId: string) => void;
  deleteTodolist: (id: string) => void;
  changeTodoListTitle: (id: string, newTitle: string) => void;
  filter: FilterType;
};
