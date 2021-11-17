import {TasksStateType} from '../App';
import {TaskType} from '../Todolist';
import {v1} from 'uuid';
import {AddTodoListActionType, DeleteTodoListActionType} from './todoListsReducer';

const initialState: TasksStateType = {
    count: []
};

export const tasksReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case 'DELETE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            };
        }
        case 'DELETE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        default:
            return state;
    }
};

export const deleteTask = (taskId: string, todolistId: string) => ({
    type: 'DELETE-TASK', taskId, todolistId
} as const);
export const addTask = (title: string, todolistId: string) => ({
    type: 'ADD-TASK', title, todolistId
} as const);
export const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId
} as const);
export const changeTaskTitle = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE', title, todolistId, taskId
} as const);
//type
export type InitialState = typeof initialState
export type DeleteTaskActionType = ReturnType<typeof deleteTask>
export type AddTaskActionType = ReturnType<typeof addTask>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>

type ActionsType = DeleteTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | DeleteTodoListActionType



