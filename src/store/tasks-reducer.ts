import {TasksStateType} from "../App";

export const tasksReducer = (state: TasksStateType, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            return {...state}
        }
            case "REMOVE-TASK":{
                return {...state}
            }
            default:throw new Error("error...")
    }
}


// Action creators

type TaskActionType = AddTaskActionType | RemoveTaskActionType


type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (title: string, todoListId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            title, todoLIstId: todoListId
        }
    }
}


type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title, todoLIstId: todoListId
        }
    }
}
