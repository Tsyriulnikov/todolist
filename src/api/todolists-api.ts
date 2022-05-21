import axios from "axios";

//Тип данных из API (из Respons) data.item:{"id":"20b34cdb-5dfb-4f7a-a015-e2cd2a5c3f85","title":"new todolist",
// "addedDate":"2022-05-20T06:27:32.74","order":-9}
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

//{"data":{"item":{"id":"3ad08e36-fce5-43b4-bc45-ea08fc3e478e","title":"new todolist",
// "addedDate":"2022-05-20T06:40:07.7976088Z","order":-10}},"messages":[],"fieldsErrors":[],"resultCode":0}
// type CreateTodoListResponseType = {
//     resultCode: number
//     messages: Array<string>
//     data: {
//         item: TodoListType
//     }
// }
//
// type DeleteTodoListResponseType = {
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }
//
// type UpdateListResponseType = {
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }

// Используем для трёх запросов один тип. В запросе надо указать тип data
//Если D не передавать, то пустой объект
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

// Tasks type
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskType = {
    title: string
    description: string|null
    completed: boolean
    status: number
    priority: number
    startDate: string|null
    deadline: string|null
}


const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': 'fe698d58-4d10-4f41-a217-bc0f632c98e5'}
})


export const todolistsApi = {
    getTodoLists() {
        // const promise = axios.get<Array<TodoListType>>('https://social-network.samuraijs.com/api/1.0/todo-lists', settings)
        return instanse.get<Array<TodoListType>>(`todo-lists`)
    },

    createTodoList: function (title: string) {
        // const promise = axios.post<ResponseType<{item:TodoListType}>>('https://social-network.samuraijs.com/api/1.0/todo-lists', {title: title}, settings)
        return instanse.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title: title})
    },

    deleteTodoList(todolistId: string) {
        // const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}`, settings)
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodoListTitle(todolistId: string, title: string) {

        return instanse.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },

//Tasks
    getTasks(todolistId: string) {
        return instanse.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },

    deleteTask(todolistId: string, taskId: string) {

        return instanse.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    createTask(todolistId: string, title: string) {
        return instanse.post<ResponseType>(`todo-lists/${todolistId}/tasks`, {title: title})
    },

    updateTask(todolistId: string, taskId: string,model:UpdateTaskType) {
        return instanse.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`,model)
    },
}

