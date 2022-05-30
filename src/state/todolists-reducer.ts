import { v1 } from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    // title: string
    // todolistId: string
    newTodolist:TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType|SetTodolistsActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        // case 'ADD-TODOLIST': {
        //     return [{
        //         id: action.todolistId,
        //         title: action.title,
        //         filter: 'all',
        //         addedDate: '',
        //         order: 0
        //     }, ...state]
        // }
        case 'ADD-TODOLIST': {
            return [{
                id: action.newTodolist.id,
                title: action.newTodolist.title,
                filter: 'all',
                addedDate: action.newTodolist.addedDate,
                order: action.newTodolist.order
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }

        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
// export const addTodolistAC = (title: string): AddTodolistActionType => {
//     return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
// }

export const addTodolistAC = (newTodolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', newTodolist}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}



export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistsTC=()=>{
    return (dispatch:Dispatch)=>{

    todolistsAPI.getTodolists()
        .then((res)=>{
            dispatch(setTodolistsAC(res.data))
        })
}}

export const removeTodolistsTC=(todolistId: string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.deleteTodolist(todolistId)
            .then((res)=>{
                dispatch(removeTodolistAC(todolistId))
            })
    }}

export const addTodolistsTC=(title: string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.createTodolist(title)
            .then((res)=>{
                dispatch(addTodolistAC(res.data.data.item))
            })
    }}

export const changeTodolistTitleTC=(todolistId:string,title: string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.updateTodolist(todolistId, title)
            .then((res)=>{
                dispatch(changeTodolistTitleAC(todolistId,title))
            })
    }}
