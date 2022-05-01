import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, todolistId1, todolistId2} from "./todolists-reducer";


const initialState:TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}
export const tasksReducer = (state: TasksStateType = initialState , action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
                 return {...state,[action.payload.todoListId]:state[action.payload.todoListId].filter(task=>task.id
               !== action.payload.id)}
        }
        case "ADD-TASK": {
             const newTask = {id: v1(), title: action.payload.title, isDone: false}
        return {...state,[action.payload.todoListId]:[newTask, ...state[action.payload.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {

        return {...state,[action.payload.todoListId]:state[action.payload.todoListId].map((el) =>
                el.id === action.payload.id ? {...el, isDone: action.payload.isDone} : el)}
        }

        case "CHANGE-TASK-TITLE": {
        return {...state,[action.payload.todoListId]:state[action.payload.todoListId].map((el) =>
                el.id === action.payload.id ? {...el, title: action.payload.newTitle} : el)}
        }
        case "ADD-TODOLIST":{
           return   {[action.todoListId]: [], ...state}

        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
            }
        default:
            return state

    }
}


// Action creators

type TaskActionType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType |
    ChangeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType


type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todoListId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id,
            todoListId
        }
    } as const
}


type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title,
            todoListId
        }
    } as const
}

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, todoListId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            id, isDone, todoListId
        }
    } as const
}

type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, newTitle: string, todoListId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            id, newTitle, todoListId
        }
    } as const
}