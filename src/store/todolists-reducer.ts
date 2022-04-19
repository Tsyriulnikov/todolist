import {FilterValuesType, TodolistType} from "../App";

// type RemoveTodoListActionType = {
//     type:"REMOVE-TODOLIST"
//     id:string
// }
type RemoveTodoListActionType = ReturnType<typeof RemoveTodoListAC>

// type AddTodoListActionType = {
//     type:"ADD-TODOLIST"
//     id:string
//     title:string
// }
type AddTodoListActionType = ReturnType<typeof AddTodoListAC>

// type ChangeTitleTodoListActionType = {
//     type:"CHANGE-TITLE-TODOLIST"
//     id:string
//     title:string
// }
type ChangeTitleTodoListActionType = ReturnType<typeof ChangeTitleTodoListAC>
// type ChangeFilterTodoListActionType = {
//     type:"CHANGE-FILTER-TODOLIST"
//     id:string
//     filter:FilterValuesType
// }
type ChangeFilterTodoListActionType = ReturnType<typeof ChangeFilterTodoListAC>

type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTitleTodoListActionType |
    ChangeFilterTodoListActionType


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            //let newTodolistId = v1();
            let newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'};
            return [newTodolist, ...state];

        }
        case "CHANGE-TITLE-TODOLIST": {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.payload.title;
            }
            return [...state]
        }
        case "CHANGE-FILTER-TODOLIST": {
            let todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter;
            }

            return [...state]
        }
        default:
            throw new Error("Error!!!!!")
    }
}

// Action creators
export const RemoveTodoListAC= (todoListId:string)=>{
    return {type: "REMOVE-TODOLIST",
        payload:{id: todoListId}} as const
}
export const AddTodoListAC= (todoListTitle:string,todolistId:string) =>{
    return {type: "ADD-TODOLIST",
        payload:{id:todolistId, title: todoListTitle}} as const
}
export const ChangeTitleTodoListAC= (todoListTitle:string,todolistId:string)=>{
    return {type: "CHANGE-TITLE-TODOLIST",
        payload:{id:todolistId ,title: todoListTitle}} as const
}
export const ChangeFilterTodoListAC= (filter:FilterValuesType, todoListId:string)=>{
    return {type: "CHANGE-FILTER-TODOLIST", payload:{id:todoListId ,filter: filter}} as const
}