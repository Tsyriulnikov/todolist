import {TasksStateType} from "../App";
import {v1} from "uuid";

// type RemoveTasksActionType = {
//     type: "REMOVE-TASK"
//     id: string
//     todolistId: string
// }

type RemoveTasksActionType = ReturnType<typeof RemoveTasksAC>

// type AddTasksActionType = {
//     type: "ADD-TASK"
//     todolistId: string
//     title: string
// }
type AddTasksActionType = ReturnType<typeof AddTasksAC>

// type ChangeStatusTasksActionType = {
//     type: "CHANGE-STATUS-TASK"
//     id: string
//     isDone: boolean
//     todolistId: string
// }
type ChangeStatusTasksActionType = ReturnType<typeof ChangeStatusTasksAC>

// type ChangeTitleTasksActionType = {
//     type: "CHANGE-TITLE-TASK"
//     id: string
//     newTitle: string
//     todolistId: string
// }
type ChangeTitleTasksActionType = ReturnType<typeof ChangeTitleTasksAC>

// type AddEmptyTasksActionType = {
//     type: "ADD-EMPTY-TASK"
//     newTodolistId: string
// }
type AddEmptyTasksActionType = ReturnType<typeof AddEmptyTasksAC>

// type DeleteTodoListTasksActionType = {
//     type: "DELETE-TODOLIST-TASK-TASK"
//     todolistId: string
// }
type DeleteTodoListTasksActionType = ReturnType<typeof DeleteTodoListTasksAC>

type TasksActionType = RemoveTasksActionType | AddTasksActionType | ChangeStatusTasksActionType |
    ChangeTitleTasksActionType | AddEmptyTasksActionType | DeleteTodoListTasksActionType
export const tasksReducer = (state: TasksStateType, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = todolistTasks.filter(t => t.id !== action.payload.id);
            return {...state}
        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.payload.title, isDone: false};
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = [task, ...todolistTasks];
            return {...state}
        }

        case "CHANGE-STATUS-TASK": {
            let todolistTasks = state[action.payload.todolistId];
            let task = todolistTasks.find(t => t.id === action.payload.id);
            if (task) {
                task.isDone = action.payload.isDone;
            }
            return {...state}
        }
        case "CHANGE-TITLE-TASK": {
            let todolistTasks = state[action.payload.todolistId];
            let task = todolistTasks.find(t => t.id === action.payload.id);
            if (task) {
                task.title = action.payload.newTitle;
            }
            return {...state}
        }
        case "ADD-EMPTY-TASK": {
            return {...state, [action.payload.newTodolistId]: []}
        }
        case "DELETE-TODOLIST-TASK-TASK": {
            delete state[action.payload.todolistId];
            return {...state}
        }
        default:
            throw new Error("Error!!!!!")
    }
}


//Action creators
export const RemoveTasksAC = (id: string, todoListId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id: id, todolistId: todoListId
        }
    } as const
}
export const AddTasksAC = (title: string, todoListId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistId: todoListId,
            title: title
        }
    } as const
}
export const ChangeStatusTasksAC = (id: string, isDone: boolean, todoListId: string) => {
    return {
        type: "CHANGE-STATUS-TASK",
        payload: {
            id: id,
            isDone: isDone,
            todolistId: todoListId
        }
    } as const
}
export const ChangeTitleTasksAC = (id: string, newTitle: string, todoListId: string) => {
    return {
        type: "CHANGE-TITLE-TASK",
        payload: {
            id: id,
            newTitle: newTitle,
            todolistId: todoListId
        }
    } as const
}
export const AddEmptyTasksAC = (newTodolistId: string) => {
    return {
        type: "ADD-EMPTY-TASK",
        payload: {newTodolistId: newTodolistId}
    } as const
}
export const DeleteTodoListTasksAC = (todoListId: string) => {
    return {
        type: "DELETE-TODOLIST-TASK-TASK",
        payload: {todolistId: todoListId}
    } as const
}