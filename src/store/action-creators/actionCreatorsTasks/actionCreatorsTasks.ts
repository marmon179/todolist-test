import { TaskType } from '../../../components/Todolist/types';

export enum TaskActions {
  DELETE_TASK = '@@tasks-reducer/DELETE-TASK',
  ADD_TASK = '@@tasks-reducer/ADD-TASK',
  CHANGE_TASK_STATUS = '@@tasks-reducer/CHANGE-TASK-STATUS',
  CHANGE_TASK_TITLE = '@@tasks-reducer/CHANGE-TASK-TITLE',
  UPDATE_TASK = '@@tasks-reducer/UPDATE-TASK',
}

export const deleteTask = (taskId: string, todolistId: string) =>
  ({
    type: TaskActions.DELETE_TASK,
    taskId,
    todolistId,
  } as const);
export const addTask = (title: string, todolistId: string) =>
  ({
    type: TaskActions.ADD_TASK,
    title,
    todolistId,
  } as const);
export const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) =>
  ({
    type: TaskActions.CHANGE_TASK_STATUS,
    isDone,
    todolistId,
    taskId,
  } as const);
export const changeTaskTitle = (taskId: string, title: string, todolistId: string) =>
  ({
    type: TaskActions.CHANGE_TASK_TITLE,
    title,
    todolistId,
    taskId,
  } as const);
export const updateTask = (task: TaskType[], todolistId: string) =>
  ({
    type: TaskActions.UPDATE_TASK,
    task,
    todolistId,
  } as const);
