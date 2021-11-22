import { AppRootStateType } from '../store/store';
import { TodoListType } from '../types/types';

export const getIsTodoList = (state: AppRootStateType): TodoListType[] => state.todoLists;
