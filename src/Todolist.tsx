import React, {useCallback} from 'react';
import {FilterType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Task} from './Task';

export const Todolist: React.FC<PropsType> = React.memo((
    {
        id, title, tasks, changeFilter, addTask, changeTaskStatus, changeTaskTitle,
        deleteTask, deleteTodolist, changeTodoListTitle, filter
    }
) => {
    const addTaskNew = useCallback((title: string) => {
        addTask(title, id);
    }, [addTask, id]);

    const removeTodolist = () => {
        deleteTodolist(id);
    };
    const changeTodolistTitle = useCallback((title: string) => {
        changeTodoListTitle(id, title);
    }, [id, changeTodoListTitle]);

    const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id]);
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id]);

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <DeleteForeverIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskNew}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    task={t}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    removeTask={deleteTask}
                    todolistId={id}
                    key={t.id}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                    color={'primary'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'default'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>;
});

//type

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    changeFilter: (value: FilterType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    deleteTask: (taskId: string, todoListId: string) => void
    deleteTodolist: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: FilterType

}

