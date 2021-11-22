import { TasksStateType } from '../../../types/types';
import {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  deleteTask,
} from '../../action-creators/actionCreatorsTasks/actionCreatorsTasks';
import {
  addTodolist,
  deleteTodoList,
} from '../../action-creators/actionCreatorsTodoList/actionCreatorsTodoList';

import { tasksReducer } from './tasksReducer';

let startState: TasksStateType = {};
beforeEach(() => {
  startState = {
    todolistId1: [
      { id: '1', title: 'Make ', isDone: true },
      { id: '2', title: 'a', isDone: false },
      { id: '3', title: 'test', isDone: true },
    ],
    todolistId2: [
      { id: '1', title: 'send', isDone: false },
      { id: '2', title: 'a', isDone: true },
      { id: '3', title: 'test', isDone: false },
    ],
  };
});

test('the correct task must be removed from the correct array', () => {
  const endState = tasksReducer(startState, deleteTask('2', 'todolistId2'));

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(2);
  expect(endState.todolistId2.every(t => t.id !== '2')).toBeTruthy();
});
test('the correct task must be added to the correct array', () => {
  const endState = tasksReducer(startState, addTask('ok', 'todolistId2'));

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(4);
  expect(endState.todolistId2[0].id).toBeDefined();
  expect(endState.todolistId2[0].title).toBe('ok');
  expect(endState.todolistId2[0].isDone).toBe(false);
});
test('the status of the specified task must be changed', () => {
  const endState = tasksReducer(startState, changeTaskStatus('2', false, 'todolistId2'));

  expect(endState.todolistId1[1].isDone).toBe(false);
  expect(endState.todolistId2[1].isDone).toBe(false);
});
test('the name of the specified task must be changed', () => {
  const endState = tasksReducer(startState, changeTaskTitle('2', 'ok', 'todolistId2'));

  expect(endState.todolistId1[1].title).toBe('a');
  expect(endState.todolistId2[1].title).toBe('ok');
  expect(endState.todolistId2[0].title).toBe('send');
});
test('a new array must be added when adding a new todolist', () => {
  const endState = tasksReducer(startState, addTodolist('new '));

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('you need to add a new key');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test('property with todolistId must be deleted', () => {
  const endState = tasksReducer(startState, deleteTodoList('todolistId2'));

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState.todolistId2).not.toBeDefined();
});
