import { combineReducers, createStore } from 'redux';

import { tasksReducer } from './tasksReducer';
import { todoListsReducer } from './todoListsReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
