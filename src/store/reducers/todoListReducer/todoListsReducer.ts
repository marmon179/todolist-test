import { TodoListType } from '../../../types/types';
import {
  ADD_TODOLIST,
  CHANGE_TODOLIST_FILTER,
  CHANGE_TODOLIST_TITLE,
  DELETE_TODOLIST,
} from '../../action-creators/actionCreatorsTodoList/actionCreatorsTodoList';
import { ActionsTodoListType } from '../../action-creators/actionCreatorsTodoList/types';

export const todoListsReducer = (
  // eslint-disable-next-line default-param-last
  state: TodoListType[] = [],
  action: ActionsTodoListType,
): TodoListType[] => {
  switch (action.type) {
    case DELETE_TODOLIST: {
      const { todolistId } = action;
      return state.filter(tl => tl.id !== todolistId);
    }
    case ADD_TODOLIST: {
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
    case CHANGE_TODOLIST_TITLE: {
      const { id, title } = action;
      const todolist = state.find(tl => tl.id === id);
      if (todolist) {
        todolist.title = title;
      }
      return [...state];
    }
    case CHANGE_TODOLIST_FILTER: {
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