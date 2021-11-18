import React, { useCallback } from 'react';

import { Button, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import { AddItemForm } from '../AddItemForm';

import { FilterType } from 'App';
import { Task, EditableSpan } from 'components';
import { updateTask } from 'store/tasksReducer';

export const Todolist: React.FC<TodoListPropsType> = React.memo(
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
    const dispatch = useDispatch();
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

    const onDragEnd = (result: DropResult): void => {
      const { source, destination } = result;
      if (!destination) return;

      const newTaskIds = Array.from(tasksForTodolist);
      const [newOrder] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, newOrder);

      dispatch(updateTask(newTaskIds, id));
    };
    return (
      <div>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitle} />
          <IconButton onClick={removeTodolist}>
            <DeleteForeverIcon />
          </IconButton>
        </h3>
        <AddItemForm addItem={addTaskNew} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable key={id} droppableId={id}>
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
        </DragDropContext>
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

// type

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodoListPropsType = {
  id: string;
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
