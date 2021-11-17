import {FilterType, TodoListType} from '../App';
import {v1} from 'uuid';


export const todoListsReducer = (state: TodoListType [] = [], action: ActionsType): TodoListType [] => {
    switch (action.type) {
        case 'DELETE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId);
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state];
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
            return state;
    }
};

export const deleteTodoList = (todolistId: string) => ({
    type: 'DELETE-TODOLIST', todolistId
} as const);
export const addTodolist = (title: string) => ({
    type: 'ADD-TODOLIST', title, todolistId: v1()
} as const);
export const changeTodolistTitle = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
} as const);
export const changeTodolistFilter = (id: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER', id, filter
} as const);

//type
export type DeleteTodoListActionType = ReturnType<typeof deleteTodoList>
export type AddTodoListActionType = ReturnType<typeof addTodolist>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodolistTitle>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodolistFilter>

export type ActionsType =
    DeleteTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

