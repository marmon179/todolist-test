import React, { ReactElement, useCallback } from 'react';

import { Container, Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { TaskType } from './components/Todolist/Todolist';

import { AddItemForm, Todolist } from 'components';
import { AppRootStateType } from 'store/store';
import {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  deleteTask,
} from 'store/tasksReducer';
import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  deleteTodoList,
} from 'store/todoListsReducer';

const App = function (): ReactElement {
  const todoLists = useSelector<AppRootStateType, TodoListType[]>(
    state => state.todoLists,
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
  const dispatch = useDispatch();

  const removeTask = useCallback(
    (id: string, todoListId: string) => {
      dispatch(deleteTask(id, todoListId));
    },
    [dispatch],
  );

  const addNewTask = useCallback(
    (title: string, todoListId: string) => {
      dispatch(addTask(title, todoListId));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    (id: string, isDone: boolean, todoListId: string) => {
      dispatch(changeTaskStatus(id, isDone, todoListId));
    },
    [dispatch],
  );

  const changeTitle = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch(changeTaskTitle(id, newTitle, todolistId));
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    (value: FilterType, todolistId: string) => {
      dispatch(changeTodolistFilter(todolistId, value));
    },
    [dispatch],
  );

  const removeTodolist = useCallback(
    (id: string) => {
      dispatch(deleteTodoList(id));
    },
    [dispatch],
  );

  const changeTodoListTitle = useCallback(
    (id: string, title: string) => {
      dispatch(changeTodolistTitle(id, title));
    },
    [dispatch],
  );

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolist(title));
    },
    [dispatch],
  );

  return (
    <Container fixed>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={3}>
        {todoLists.map(tl => {
          const tasksForTodolist = tasks[tl.id];
          return (
            <Grid item key={tl.id}>
              <Paper elevation={3} style={{ padding: '10px' }}>
                <Todolist
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  tasks={tasksForTodolist}
                  deleteTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addNewTask}
                  changeTaskStatus={changeStatus}
                  filter={tl.filter}
                  deleteTodolist={removeTodolist}
                  changeTaskTitle={changeTitle}
                  changeTodoListTitle={changeTodoListTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default App;
// type
export type FilterType = 'all' | 'active' | 'completed';
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};
export type TasksStateType = {
  [key: string]: TaskType[];
};
