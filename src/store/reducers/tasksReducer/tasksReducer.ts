import { Reducer } from 'redux';
import { v1 } from 'uuid';

import { TaskType } from '../../../components/Todolist/types';
import { TasksStateType } from '../../../types/types';
import { TaskActions } from '../../action-creators/actionCreatorsTasks';
import {
  TasksActionsTypes,
  InitialTasksState,
} from '../../action-creators/actionCreatorsTasks/types';
import { TodolistActions } from '../../action-creators/actionCreatorsTodoList';
import { TodolistActionsTypes } from '../../action-creators/actionCreatorsTodoList/types';

export const initialTasksState: TasksStateType = {
  count: [],
};

export const tasksReducer: Reducer<
  InitialTasksState,
  TasksActionsTypes | TodolistActionsTypes
> = (
  // eslint-disable-next-line default-param-last
  state = initialTasksState,
  action,
): InitialTasksState => {
  switch (action.type) {
    case TaskActions.DELETE_TASK: {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
      return stateCopy;
    }
    case TaskActions.ADD_TASK: {
      const { title, todolistId } = action;
      const stateCopy = { ...state };
      const newTask: TaskType = {
        id: v1(),
        title,
        isDone: false,
      };
      const tasks = stateCopy[todolistId];
      const newTasks = [newTask, ...tasks];
      stateCopy[todolistId] = newTasks;
      return stateCopy;
    }
    case TaskActions.CHANGE_TASK_STATUS: {
      const { todolistId, isDone, taskId } = action;
      const stateCopy = { ...state };
      const todolistTasks = state[todolistId];
      const newTasksArray = todolistTasks.map(t =>
        t.id === taskId ? { ...t, isDone } : t,
      );
      stateCopy[action.todolistId] = newTasksArray;
      return stateCopy;
    }
    case TaskActions.CHANGE_TASK_TITLE: {
      const { title, todolistId, taskId } = action;
      const stateCopy = { ...state };
      const todolistTasks = state[todolistId];
      const newTasksArray = todolistTasks.map(task =>
        task.id === taskId ? { ...task, title } : task,
      );
      stateCopy[todolistId] = newTasksArray;
      return stateCopy;
    }
    case TodolistActions.ADD_TODOLIST: {
      const { todolistId } = action;
      return {
        ...state,
        [todolistId]: [],
      };
    }
    case TodolistActions.DELETE_TODOLIST: {
      const { todolistId } = action;
      const copyState = { ...state };
      delete copyState[todolistId];
      return copyState;
    }
    case TaskActions.UPDATE_TASK: {
      const { task, todolistId } = action;
      const stateCopy = { ...state };
      stateCopy[todolistId] = task;
      return stateCopy;
    }
    default:
      return state;
  }
};
