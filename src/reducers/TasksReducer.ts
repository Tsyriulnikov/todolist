import {TaskType} from "../Todolist";
import {TasksStateType} from "../App";



export const TasksReducer = (state: TasksStateType, action: TasksReducerType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
             let todolistTasks = state[action.payload.todolistId];
            return state[action.payload.todolistId] = todolistTasks.filter(t => t.id !== action.payload.id);
        }
        default:
            return state
    }

}
export type TasksReducerType = RemoveTasksACType
export type RemoveTasksACType = ReturnType<typeof removeTasksAC>

export const removeTasksAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id: id,
            todolistId: todolistId
        }
    }as const
}