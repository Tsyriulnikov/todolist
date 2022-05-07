import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

// type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTodoListActionType = {
    type:"REMOVE-TODOLIST"
    id:string
}
export type AddTodoListActionType = {
    type:"ADD-TODOLIST"
    title:string
    todoListId:string
}
type ChangeTitleTodoListActionType = {
    type:"CHANGE-TITLE-TODOLIST"
    id:string
    title:string
}
type ChangeFilterTodoListActionType = {
    type:"CHANGE-FILTER-TODOLIST"
    id:string
    filter:FilterValuesType
}
type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTitleTodoListActionType |
    ChangeFilterTodoListActionType

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState:Array<TodolistType>=[
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

export const todolistsReducer = (state=initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
           //  let newTodolistId = v1();
            let newTodolist: TodolistType = {id: action.todoListId, title: action.title, filter: 'all'};
           console.log(newTodolist)
          //  debugger

            return [newTodolist, ...state];
        }
        case "CHANGE-TITLE-TODOLIST": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case "CHANGE-FILTER-TODOLIST": {
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }

            return [...state]
        }
        default:
            return state
    }
}

// Action creators
export const removeTodoListAC= (todoListId:string):RemoveTodoListActionType =>{
    return {type: "REMOVE-TODOLIST", id: todoListId}
}
export const addTodoListAC= (todoListTitle:string):AddTodoListActionType =>{
    return {type: "ADD-TODOLIST", title: todoListTitle, todoListId:v1()}
}
export const changeTitleTodoListAC= (todoListTitle:string, todolistId:string):ChangeTitleTodoListActionType =>{
    return {type: "CHANGE-TITLE-TODOLIST", id:todolistId ,title: todoListTitle}
}
export const changeFilterTodoListAC= (filter:FilterValuesType, todoListId:string):ChangeFilterTodoListActionType =>{
    return {type: "CHANGE-FILTER-TODOLIST", id:todoListId ,filter: filter}
}