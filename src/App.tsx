import React, { ReactElement, useCallback } from 'react';

import { Container, Grid, Paper } from '@material-ui/core';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from './hooks/useTypedSelector';
import { getIsTasks } from './selectors/getIsTasks';
import { getIsTodoList } from './selectors/getIsTodoList';
import { actionsTasks } from './store/action-creators/actionCreatorsTasks';
import { actionsTodolist } from './store/action-creators/actionCreatorsTodoList';
import { FilterType } from './types/types';

import { AddItemForm, Todolist } from 'components';

const App = (): ReactElement => {
  const todoLists = useTypedSelector(getIsTodoList);
  const tasks = useTypedSelector(getIsTasks);
  const dispatch = useDispatch();

  const { changeTaskStatus, changeTaskTitle, deleteTask, updateTask, addTask } =
    actionsTasks;
  const { addTodolist, changeTodolistFilter, changeTodolistTitle, deleteTodoList } =
    actionsTodolist;
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
        {todoLists.map(({ id, title, filter }) => {
          const tasksForTodolist = tasks[id];

          const onDragEnd = (result: DropResult): void => {
            const { source, destination } = result;
            if (!destination) return;

            const newTaskIds = Array.from(tasksForTodolist);
            const [newOrder] = newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, newOrder);

            dispatch(updateTask(newTaskIds, id));
          };
          return (
            <DragDropContext key={id} onDragEnd={onDragEnd}>
              <Grid item key={id}>
                <Paper elevation={3} style={{ padding: '10px' }}>
                  <Todolist
                    key={id}
                    id={id}
                    title={title}
                    tasks={tasksForTodolist}
                    deleteTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addNewTask}
                    changeTaskStatus={changeStatus}
                    filter={filter}
                    deleteTodolist={removeTodolist}
                    changeTaskTitle={changeTitle}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            </DragDropContext>
          );
        })}
      </Grid>
    </Container>
  );
};

export default App;
