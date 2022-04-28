import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

export const tasksReducer = (state: TasksStateType, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            // const stateCopy = {...state}
            // const tasks = state[action.payload.todoListId]
            // const filteredTasks = tasks.filter(el => el.id !== action.payload.id)
            // stateCopy[action.payload.todoListId] = filteredTasks
            // return stateCopy
       return {...state,[action.payload.todoListId]:state[action.payload.todoListId].filter(task=>task.id
               !== action.payload.id)}
        }
        case "ADD-TASK": {
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.payload.todoListId]
             const newTask = {id: v1(), title: action.payload.title, isDone: false}
            // const newTasks = [newTask, ...tasks]
            // stateCopy[action.payload.todoListId] = newTasks
            // return stateCopy
        return {...state,[action.payload.todoListId]:[newTask, ...state[action.payload.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.payload.todoListId];
            // // найдём нужную таску:
            // let task = tasks.find(t => t.id === action.payload.id);
            // //изменим таску, если она нашлась
            // if (task) {
            //     task.isDone = action.payload.isDone;
            // }
            // return stateCopy
        return {...state,[action.payload.todoListId]:state[action.payload.todoListId].map((el) =>
                el.id === action.payload.id ? {...el, isDone: action.payload.isDone} : el)}
        }

        case "CHANGE-TASK-TITLE": {
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.payload.todoListId];
            // // найдём нужную таску:
            // let task = tasks.find(t => t.id === action.payload.id);
            // //изменим таску, если она нашлась
            // if (task) {
            //     task.title = action.payload.newTitle;
            // }
            // return stateCopy
        return {...state,[action.payload.todoListId]:state[action.payload.todoListId].map((el) =>
                el.id === action.payload.id ? {...el, title: action.payload.newTitle} : el)}
        }
        case "ADD-TODOLIST":{
            // const stateCopy = {...state}
            // stateCopy[action.todoListId]=[]
            // console.log(stateCopy)
            // return stateCopy
        // return {...state, [action.todoListId]:[]}
           return   {[action.todoListId]: [], ...state}

        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
            }
        default:
            throw new Error("error...")
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