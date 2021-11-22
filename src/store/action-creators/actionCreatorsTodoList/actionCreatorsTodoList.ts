import { v1 } from 'uuid';

import { FilterType } from '../../../types/types';

export const DELETE_TODOLIST = '@@todolist-reducer/DELETE-TODOLIST';
export const ADD_TODOLIST = '@@todolist-reducer/ADD-TODOLIST';
export const CHANGE_TODOLIST_TITLE = '@@todolist-reducer/CHANGE-TODOLIST-TITLE';
export const CHANGE_TODOLIST_FILTER = '@@todolist-reducer/CHANGE-TODOLIST-FILTER';

export const deleteTodoList = (todolistId: string) =>
  ({
    type: DELETE_TODOLIST,
    todolistId,
  } as const);
export const addTodolist = (title: string) =>
  ({
    type: ADD_TODOLIST,
    title,
    todolistId: v1(),
  } as const);
export const changeTodolistTitle = (id: string, title: string) =>
  ({
    type: CHANGE_TODOLIST_TITLE,
    id,
    title,
  } as const);
export const changeTodolistFilter = (id: string, filter: FilterType) =>
  ({
    type: CHANGE_TODOLIST_FILTER,
    id,
    filter,
  } as const);
