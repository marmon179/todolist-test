import { TaskType } from '../Todolist/types';

export type TaskPropsType = {
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  task: TaskType;
  todolistId: string;
  index: number;
};
