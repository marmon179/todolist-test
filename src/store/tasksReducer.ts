import { v1 } from 'uuid';

import { TasksStateType } from 'App';
import { TaskType } from 'components/Todolist/Todolist';
import { AddTodoListActionType, DeleteTodoListActionType } from 'store/todoListsReducer';

const initialState: TasksStateType = {
  count: [],
};

export const tasksReducer = (
  // eslint-disable-next-line default-param-last
  state: InitialState = initialState,
  action: ActionsType,
): InitialState => {
  switch (action.type) {
    case 'DELETE-TASK': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = { ...state };
      const newTask: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      const tasks = stateCopy[action.todolistId];
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      const stateCopy = { ...state };
      const todolistTasks = state[action.todolistId];
      const newTasksArray = todolistTasks.map(t =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t,
      );
      stateCopy[action.todolistId] = newTasksArray;
      return stateCopy;
    }
    case 'CHANGE-TASK-TITLE': {
      const stateCopy = { ...state };
      const todolistTasks = state[action.todolistId];
      const newTasksArray = todolistTasks.map(t =>
        t.id === action.taskId ? { ...t, title: action.title } : t,
      );
      stateCopy[action.todolistId] = newTasksArray;
      return stateCopy;
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }
    case 'DELETE-TODOLIST': {
      const copyState = { ...state };
      delete copyState[action.todolistId];
      return copyState;
    }
    case 'UPDATE-TASK': {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = action.task;
      return stateCopy;
    }
    default:
      return state;
  }
};

export const deleteTask = (taskId: string, todolistId: string) =>
  ({
    type: 'DELETE-TASK',
    taskId,
    todolistId,
  } as const);
export const addTask = (title: string, todolistId: string) =>
  ({
    type: 'ADD-TASK',
    title,
    todolistId,
  } as const);
export const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) =>
  ({
    type: 'CHANGE-TASK-STATUS',
    isDone,
    todolistId,
    taskId,
  } as const);
export const changeTaskTitle = (taskId: string, title: string, todolistId: string) =>
  ({
    type: 'CHANGE-TASK-TITLE',
    title,
    todolistId,
    taskId,
  } as const);
export const updateTask = (task: TaskType[], todolistId: string) =>
  ({
    type: 'UPDATE-TASK',
    task,
    todolistId,
  } as const);
// type
export type InitialState = typeof initialState;
export type DeleteTaskActionType = ReturnType<typeof deleteTask>;
export type AddTaskActionType = ReturnType<typeof addTask>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>;
export type UpdateTaskActionType = ReturnType<typeof updateTask>;

type ActionsType =
  | DeleteTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListActionType
  | DeleteTodoListActionType
  | UpdateTaskActionType;
