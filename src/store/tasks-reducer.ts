import {TasksStateType} from "../App";
import {v1} from "uuid";

type RemoveTasksActionType = {
    type: "REMOVE-TASK"
    id: string
    todolistId: string
}
type AddTasksActionType = {
    type: "ADD-TASK"
    todolistId: string
    title: string
}
type ChangeStatusTasksActionType = {
    type: "CHANGE-STATUS-TASK"
    id: string
    isDone: boolean
    todolistId: string
}
type ChangeTitleTasksActionType = {
    type: "CHANGE-TITLE-TASK"
    id: string
    newTitle: string
    todolistId: string
}
type AddEmptyTasksActionType = {
    type: "ADD-EMPTY-TASK"
    newTodolistId: string
}
type DeleteTodoListTasksActionType = {
    type: "DELETE-TODOLIST-TASK-TASK"
    todolistId: string
}

type TasksActionType = RemoveTasksActionType | AddTasksActionType | ChangeStatusTasksActionType |
    ChangeTitleTasksActionType | AddEmptyTasksActionType | DeleteTodoListTasksActionType
export const tasksReducer = (state: TasksStateType, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id !== action.id);
            return {...state}
        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.title, isDone: false};
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = [task, ...todolistTasks];
            return {...state}
        }

        case "CHANGE-STATUS-TASK": {
            let todolistTasks = state[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.id);
            if (task) {
                task.isDone = action.isDone;
            }
            return {...state}
        }
        case "CHANGE-TITLE-TASK": {
            let todolistTasks = state[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.id);
            if (task) {
                task.title = action.newTitle;
            }
            return {...state}
        }
        case "ADD-EMPTY-TASK": {
            return {...state, [action.newTodolistId]: []}
        }
        case "DELETE-TODOLIST-TASK-TASK": {
            delete state[action.todolistId];
            return {...state}
        }
    }
}


//Action creators
export const RemoveTasksAC = (id: string, todoListId: string): RemoveTasksActionType => {
    return {type: "REMOVE-TASK", id: id, todolistId: todoListId}
}
export const AddTasksAC = (title: string, todoListId: string): AddTasksActionType => {
    return {type: "ADD-TASK", todolistId: todoListId, title: title}
}
export const ChangeStatusTasksAC = (id: string, isDone: boolean, todoListId: string): ChangeStatusTasksActionType => {
    return {type: "CHANGE-STATUS-TASK", id: id, isDone: isDone, todolistId: todoListId}
}
export const ChangeTitleTasksAC = (id: string, newTitle: string, todoListId: string): ChangeTitleTasksActionType => {
    return {type: "CHANGE-TITLE-TASK", id: id, newTitle: newTitle, todolistId: todoListId}
}
export const AddEmptyTasksAC = (newTodolistId: string): AddEmptyTasksActionType => {
    return {type: "ADD-EMPTY-TASK", newTodolistId: newTodolistId}
}
export const DeleteTodoListTasksAC = (todoListId: string): DeleteTodoListTasksActionType => {
    return {type: "DELETE-TODOLIST-TASK-TASK", todolistId: todoListId}
}