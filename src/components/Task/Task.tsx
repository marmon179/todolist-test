import React, { ChangeEvent, CSSProperties, FC, memo, useCallback } from 'react';

import { Checkbox, IconButton } from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Draggable } from 'react-beautiful-dnd';

import { TaskPropsType } from './types';

import { EditableSpan } from 'components';

export const Task: FC<TaskPropsType> = memo(
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
