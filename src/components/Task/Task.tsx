import React, { ChangeEvent, CSSProperties, useCallback } from 'react';

import { Checkbox, IconButton } from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Draggable } from 'react-beautiful-dnd';

import { EditableSpan } from 'components';
import { TaskType } from 'components/Todolist/Todolist';

export const Task: React.FC<TaskPropsType> = React.memo(
  ({ changeTaskStatus, changeTaskTitle, removeTask, task, todolistId, index }) => {
    const onClickHandler = (): void => removeTask(task.id, todolistId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      const doneValue = e.currentTarget.checked;
      changeTaskStatus(task.id, doneValue, todolistId);
    };
    const onTitleChangeHandler = useCallback(
      (value: string) => {
        changeTaskTitle(task.id, value, todolistId);
      },
      [task.id, changeTaskTitle, todolistId],
    );

    const getItemStyle = (
      isDragging: boolean,
      draggableStyle: any,
    ): CSSProperties | undefined => ({
      background: isDragging ? '#3f51b5' : 'white',
      color: isDragging ? 'white' : 'black',
      borderRadius: `5px`,
      ...draggableStyle,
    });

    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          >
            <IconButton {...provided.dragHandleProps}>
              <DehazeIcon />
            </IconButton>
            <Checkbox
              checked={task.isDone}
              color="secondary"
              onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
              <DeleteForeverIcon />
            </IconButton>
          </div>
        )}
      </Draggable>
    );
  },
);
// type
type TaskPropsType = {
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  task: TaskType;
  todolistId: string;
  index: number;
};
