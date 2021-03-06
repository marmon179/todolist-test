import { Reducer } from 'redux';

import { TodoListType } from '../../../types/types';
import { TodolistActions } from '../../action-creators/actionCreatorsTodoList';
import { TodolistActionsTypes } from '../../action-creators/actionCreatorsTodoList/types';

export const todoListsReducer: Reducer<TodoListType[], TodolistActionsTypes> = (
  // eslint-disable-next-line default-param-last
  state = [],
  action,
): TodoListType[] => {
  switch (action.type) {
    case TodolistActions.DELETE_TODOLIST: {
      const { todolistId } = action;
      return state.filter(tl => tl.id !== todolistId);
    }
    case TodolistActions.ADD_TODOLIST: {
      const { title, todolistId } = action;
      return [
        {
          id: todolistId,
          title,
          filter: 'all',
        },
        ...state,
      ];
    }
    case TodolistActions.CHANGE_TODOLIST_TITLE: {
      const { id, title } = action;
      const todolist = state.find(tl => tl.id === id);
      if (todolist) {
        todolist.title = title;
      }
      return [...state];
    }
    case TodolistActions.CHANGE_TODOLIST_FILTER: {
      const { id, filter } = action;
      const todolist = state.find(tl => tl.id === id);
      if (todolist) {
        todolist.filter = filter;
      }
      return [...state];
    }
    default:
      return state;
  }
};
