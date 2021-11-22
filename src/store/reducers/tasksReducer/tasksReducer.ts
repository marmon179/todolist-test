import { v1 } from 'uuid';

import { TaskType } from '../../../components/Todolist/types';
import { TasksStateType } from '../../../types/types';
import {
  ADD_TASK,
  CHANGE_TASK_STATUS,
  CHANGE_TASK_TITLE,
  DELETE_TASK,
  UPDATE_TASK,
} from '../../action-creators/actionCreatorsTasks/actionCreatorsTasks';
import {
  ActionsTasksType,
  InitialTasksState,
} from '../../action-creators/actionCreatorsTasks/types';
import {
  ADD_TODOLIST,
  DELETE_TODOLIST,
} from '../../action-creators/actionCreatorsTodoList/actionCreatorsTodoList';

export const initialTasksState: TasksStateType = {
  count: [],
};

export const tasksReducer = (
  // eslint-disable-next-line default-param-last
  state: InitialTasksState = initialTasksState,
  action: ActionsTasksType,
): InitialTasksState => {
  switch (action.type) {
    case DELETE_TASK: {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
      return stateCopy;
    }
    case ADD_TASK: {
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
    case CHANGE_TASK_STATUS: {
      const { todolistId, isDone, taskId } = action;
      const stateCopy = { ...state };
      const todolistTasks = state[todolistId];
      const newTasksArray = todolistTasks.map(t =>
        t.id === taskId ? { ...t, isDone } : t,
      );
      stateCopy[action.todolistId] = newTasksArray;
      return stateCopy;
    }
    case CHANGE_TASK_TITLE: {
      const { title, todolistId, taskId } = action;
      const stateCopy = { ...state };
      const todolistTasks = state[todolistId];
      const newTasksArray = todolistTasks.map(task =>
        task.id === taskId ? { ...task, title } : task,
      );
      stateCopy[todolistId] = newTasksArray;
      return stateCopy;
    }
    case ADD_TODOLIST: {
      const { todolistId } = action;
      return {
        ...state,
        [todolistId]: [],
      };
    }
    case DELETE_TODOLIST: {
      const { todolistId } = action;
      const copyState = { ...state };
      delete copyState[todolistId];
      return copyState;
    }
    case UPDATE_TASK: {
      const { task, todolistId } = action;
      const stateCopy = { ...state };
      stateCopy[todolistId] = task;
      return stateCopy;
    }
    default:
      return state;
  }
};
