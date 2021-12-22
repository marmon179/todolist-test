import { v1 } from 'uuid';

import { FilterType, TodoListType } from '../../../types/types';
import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  deleteTodoList,
} from '../../action-creators/actionCreatorsTodoList';

import { todoListsReducer } from './todoListsReducer';

let todolistId1: string;
let todolistId2: string;
let startState: TodoListType[] = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, title: 'Hello', filter: 'all' },
    { id: todolistId2, title: 'world', filter: 'all' },
  ];
});

test('the correct list of todoLists must be deleted', () => {
  const endState = todoListsReducer(startState, deleteTodoList(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('it is necessary to add a correct list of todoLists', () => {
  const newTodoListTitle = 'New ';

  const endState = todoListsReducer(startState, addTodolist(newTodoListTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodoListTitle);
  expect(endState[0].filter).toBe('all');
});

test('the right todolist should change its name', () => {
  const newTodoListTitle = 'New ';

  const action = changeTodolistTitle(todolistId2, newTodoListTitle);

  const endState = todoListsReducer(startState, action);

  expect(endState[0].title).toBe('Hello');
  expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todolist should be changed', () => {
  const newFilter: FilterType = 'completed';
  const endState = todoListsReducer(
    startState,
    changeTodolistFilter(todolistId2, newFilter),
  );

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe('completed');
});
