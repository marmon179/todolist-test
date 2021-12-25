import { v1 } from 'uuid';

import { FilterType } from '../../../types/types';

export enum TodolistActions {
  DELETE_TODOLIST = '@@todolist-reducer/DELETE-TODOLIST',
  ADD_TODOLIST = '@@todolist-reducer/ADD-TODOLIST',
  CHANGE_TODOLIST_TITLE = '@@todolist-reducer/CHANGE-TODOLIST-TITLE',
  CHANGE_TODOLIST_FILTER = '@@todolist-reducer/CHANGE-TODOLIST-FILTER',
}

export const actionsTodolist = {
  deleteTodoList: (todolistId: string) =>
    ({
      type: TodolistActions.DELETE_TODOLIST,
      todolistId,
    } as const),
  addTodolist: (title: string) =>
    ({
      type: TodolistActions.ADD_TODOLIST,
      title,
      todolistId: v1(),
    } as const),
  changeTodolistTitle: (id: string, title: string) =>
    ({
      type: TodolistActions.CHANGE_TODOLIST_TITLE,
      id,
      title,
    } as const),
  changeTodolistFilter: (id: string, filter: FilterType) =>
    ({
      type: TodolistActions.CHANGE_TODOLIST_FILTER,
      id,
      filter,
    } as const),
};
