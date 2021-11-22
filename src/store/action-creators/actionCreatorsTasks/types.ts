import { initialTasksState } from '../../reducers/tasksReducer/tasksReducer';
import {
  AddTodoListActionType,
  DeleteTodoListActionType,
} from '../actionCreatorsTodoList/types';

import {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  deleteTask,
  updateTask,
} from './actionCreatorsTasks';

export type InitialTasksState = typeof initialTasksState;
export type DeleteTaskActionType = ReturnType<typeof deleteTask>;
export type AddTaskActionType = ReturnType<typeof addTask>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>;
export type UpdateTaskActionType = ReturnType<typeof updateTask>;

export type ActionsTasksType =
  | DeleteTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListActionType
  | DeleteTodoListActionType
  | UpdateTaskActionType;
