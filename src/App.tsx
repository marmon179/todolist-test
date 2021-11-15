import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {Container, Grid, Paper} from '@material-ui/core';

const App = () => {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'Hello', filter: 'all'},
        {id: todoListId2, title: 'Have a nice day', filter: 'all'}
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'world', isDone: true},
            {id: v1(), title: '!!!', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'a', isDone: true},
            {id: v1(), title: 'nice day', isDone: false}
        ]
    });

    const deleteTask = (id: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].filter(t => t.id !== id);
        setTasks({...tasks});
    };

    const addTask = (title: string, todoListId: string) => {
        const task = {id: v1(), title: title, isDone: false};
        tasks[todoListId] = [task, ...tasks[todoListId]];
        setTasks({...tasks});
    };

    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        const task = tasks[todoListId].find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    };

    const changeTaskTitle = (id: string, newTitle: string, todoListId: string) => {
        const task = tasks[todoListId].find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    };

    const changeFilter = (value: FilterType, todoListId: string) => {
        const todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    };

    const deleteTodolist = (id: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks});
    };

    const changeTodoListTitle = (id: string, title: string) => {
        const todoList = todoLists.find(tl => tl.id === id);
        if (todoList) {
            todoList.title = title;
            setTodoLists([...todoLists]);
        }
    };

    const addTodoList = (title: string) => {
        const newTodoListId = v1();
        setTodoLists([{id: newTodoListId, title: title, filter: 'all'}, ...todoLists]);
        setTasks({...tasks, [newTodoListId]: []});
    };

    return (
        <>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            const allTodoListTasks = tasks[tl.id];
                            let tasksForTodolist = allTodoListTasks;

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodoListTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodoListTasks.filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        deleteTask={deleteTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        deleteTodolist={deleteTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
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

