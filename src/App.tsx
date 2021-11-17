import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {Container, Grid, Paper} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {changeTaskStatus, changeTaskTitle} from './store/tasksReducer';
import {addTodolist, changeTodolistFilter, changeTodolistTitle} from './store/todoListsReducer';

const App = () => {

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const deleteTask = useCallback((id: string, todoListId: string) => {
        dispatch(deleteTask(id, todoListId));
    }, [dispatch]);

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTask(title, todoListId));
    }, [dispatch]);

    const changeStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatus(id, isDone, todoListId));
    }, [dispatch]);

    const change_TaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitle(id, newTitle, todolistId));
    }, [dispatch]);

    const changeFilter = useCallback((value: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilter(todolistId, value));
    }, [dispatch]);

    const deleteTodolist = useCallback((id: string) => {
        dispatch(deleteTodolist(id));
    }, [dispatch]);

    const change_TodoListTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitle(id, title));
    }, [dispatch]);

    const add_TodoList = useCallback((title: string) => {
        dispatch(addTodolist(title));
    }, [dispatch]);

    return (
        <>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={add_TodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodolist = tasks[tl.id];
                            return <Grid item>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        deleteTask={deleteTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        deleteTodolist={deleteTodolist}
                                        changeTaskTitle={change_TaskTitle}
                                        changeTodoListTitle={change_TodoListTitle}
                                    />
                                </Paper>
                            </Grid>;
                        })
                    }
                </Grid>
            </Container>
        </>
    );
};

export default App;
//type
export type FilterType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

