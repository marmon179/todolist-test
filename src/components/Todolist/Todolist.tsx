import React, { FC, memo, useCallback } from 'react';

import { Button, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Droppable } from 'react-beautiful-dnd';

import { AddItemForm } from '../AddItemForm';

import { TodoListPropsType } from './types';

import { EditableSpan, Task } from 'components';

export const Todolist: FC<TodoListPropsType> = memo(
  ({
    id,
    title,
    tasks,
    changeFilter,
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    deleteTask,
    deleteTodolist,
    changeTodoListTitle,
    filter,
  }) => {
    const addTaskNew = useCallback(
      (newTitle: string) => {
        addTask(newTitle, id);
      },
      [addTask, id],
    );

    const removeTodolist = (): void => deleteTodolist(id);
    const changeTodolistTitle = useCallback(
      (changeTitle: string) => {
        changeTodoListTitle(id, changeTitle);
      },
      [id, changeTodoListTitle],
    );

    const onAllClickHandler = useCallback(
      () => changeFilter('all', id),
      [changeFilter, id],
    );
    const onActiveClickHandler = useCallback(
      () => changeFilter('active', id),
      [changeFilter, id],
    );
    const onCompletedClickHandler = useCallback(
      () => changeFilter('completed', id),
      [changeFilter, id],
    );

    let tasksForTodolist = tasks;

    if (filter === 'active') {
      tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
      tasksForTodolist = tasks.filter(t => t.isDone);
    }
    return (
      <div>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitle} />
          <IconButton onClick={removeTodolist}>
            <DeleteForeverIcon />
          </IconButton>
        </h3>
        <AddItemForm addItem={addTaskNew} />

        <Droppable key={id} droppableId={id}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasksForTodolist.map((task, index) => (
                <Task
                  task={task}
                  changeTaskStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                  removeTask={deleteTask}
                  todolistId={id}
                  key={task.id}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div style={{ paddingTop: '10px' }}>
          <Button
            variant={filter === 'all' ? 'contained' : 'text'}
            onClick={onAllClickHandler}
            color="primary"
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'contained' : 'text'}
            onClick={onActiveClickHandler}
            color="default"
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'contained' : 'text'}
            onClick={onCompletedClickHandler}
            color="secondary"
          >
            Completed
          </Button>
        </div>
      </div>
    );
  },
);
