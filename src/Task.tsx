import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {TaskType} from './Todolist';

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task: React.FC<TaskPropsType> = React.memo((
    {
        changeTaskStatus, changeTaskTitle, removeTask, task, todolistId
    }
) => {
    const onClickHandler = () => removeTask(task.id, todolistId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const doneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, doneValue, todolistId);
    };
    const onTitleChangeHandler = useCallback((value: string) => {
        changeTaskTitle(task.id, value, todolistId);
    }, [task.id, changeTaskTitle, todolistId]);


    return <div key={task.id}>
        <Checkbox
            checked={task.isDone}
            color="secondary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <DeleteForeverIcon/>
        </IconButton>
    </div>;
});
