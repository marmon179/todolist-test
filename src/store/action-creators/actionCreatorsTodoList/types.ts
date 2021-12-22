import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  deleteTodoList,
} from './index';

export type DeleteTodoListActionType = ReturnType<typeof deleteTodoList>;
export type AddTodoListActionType = ReturnType<typeof addTodolist>;
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodolistTitle>;
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodolistFilter>;

export type ActionsTodoListType =
  | DeleteTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType;
