import { TaskType } from '../../../components/Todolist/types';

export const DELETE_TASK = '@@tasks-reducer/DELETE-TASK';
export const ADD_TASK = '@@tasks-reducer/ADD-TASK';
export const CHANGE_TASK_STATUS = '@@tasks-reducer/CHANGE-TASK-STATUS';
export const CHANGE_TASK_TITLE = '@@tasks-reducer/CHANGE-TASK-TITLE';
export const UPDATE_TASK = '@@tasks-reducer/UPDATE-TASK';

export const deleteTask = (taskId: string, todolistId: string) =>
  ({
    type: DELETE_TASK,
    taskId,
    todolistId,
  } as const);
export const addTask = (title: string, todolistId: string) =>
  ({
    type: ADD_TASK,
    title,
    todolistId,
  } as const);
export const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) =>
  ({
    type: CHANGE_TASK_STATUS,
    isDone,
    todolistId,
    taskId,
  } as const);
export const changeTaskTitle = (taskId: string, title: string, todolistId: string) =>
  ({
    type: CHANGE_TASK_TITLE,
    title,
    todolistId,
    taskId,
  } as const);
export const updateTask = (task: TaskType[], todolistId: string) =>
  ({
    type: UPDATE_TASK,
    task,
    todolistId,
  } as const);
