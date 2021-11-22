import React, { ChangeEvent, FC, memo, useCallback } from 'react';

import { Checkbox, IconButton } from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Draggable } from 'react-beautiful-dnd';

import { getItemStyle } from './styles/getItemStyle';
import { TaskPropsType } from './types';

import { EditableSpan } from 'components';

export const Task: FC<TaskPropsType> = memo(
  ({ changeTaskStatus, changeTaskTitle, removeTask, task, todolistId, index }) => {
    const onIconButtonClick = (): void => removeTask(task.id, todolistId);
    const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const doneValue = e.currentTarget.checked;
      changeTaskStatus(task.id, doneValue, todolistId);
    };
    const onTitleChange = useCallback(
      (value: string) => {
        changeTaskTitle(task.id, value, todolistId);
      },
      [task.id, changeTaskTitle, todolistId],
    );

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
              onChange={onCheckboxChange}
            />

            <EditableSpan value={task.title} onChange={onTitleChange} />
            <IconButton onClick={onIconButtonClick}>
              <DeleteForeverIcon />
            </IconButton>
          </div>
        )}
      </Draggable>
    );
  },
);
