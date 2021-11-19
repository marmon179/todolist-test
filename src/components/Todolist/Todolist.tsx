import React, { useCallback } from 'react';

import { Button, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { AddItemForm } from '../AddItemForm';

import { FilterType } from 'App';
import { Task, EditableSpan } from 'components';

export const Todolist: React.FC<TodoListPropsType> = React.memo(
  ({
    id,
    index,
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
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <h3>
              <EditableSpan value={title} onChange={changeTodolistTitle} />
              <IconButton onClick={removeTodolist}>
                <DeleteForeverIcon />
              </IconButton>
            </h3>
            <AddItemForm addItem={addTaskNew} />

            <Droppable key={id} droppableId="Task">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasksForTodolist.map((t, index) => (
                    <Task
                      task={t}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}
                      removeTask={deleteTask}
                      todolistId={id}
                      key={t.id}
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
        )}
      </Draggable>
    );
  },
);

// type

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodoListPropsType = {
  id: string;
  index: number;
  title: string;
  tasks: TaskType[];
  changeFilter: (value: FilterType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void;
  deleteTask: (taskId: string, todoListId: string) => void;
  deleteTodolist: (id: string) => void;
  changeTodoListTitle: (id: string, newTitle: string) => void;
  filter: FilterType;
};
