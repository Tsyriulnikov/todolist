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

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}



const settings = {
    withCredentials: true,
    headers: {'API-KEY': 'fe698d58-4d10-4f41-a217-bc0f632c98e5'}
}

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': 'fe698d58-4d10-4f41-a217-bc0f632c98e5'}
})


export const todolistsApi = {
    GetTodoLists() {
        const promise = axios.get<Array<TodoListType>>('https://social-network.samuraijs.com/api/1.0/todo-lists', settings)
        //const promise = instanse.get(`${'todo-lists'}`)
        return promise
    },

    CreateTodoList(title: string) {
        const promise = axios.post<ResponseType<{item:TodoListType}>>('https://social-network.samuraijs.com/api/1.0/todo-lists', {title: title}, settings)
        // instanse.post(`${'todo-lists'}`, {title})

        return promise
    },

    DeleteTodoList(todolistId: string) {
        const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}`, settings)
        // instanse.delete(`${'todo-lists'}${todolistId}`)
        return promise
    },

    UpdateTodoListTitle(todolistId: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}`, {title: title}, settings)
        // instanse.put(`${'todo-lists'}${'/50e3e13d-0880-480f-a0f3-6be7db67a21d'}`, {title: "First Changed again"})
        // instanse.put(`${'todo-lists'}${todolistId}`, {title: "First Changed again"})

        return promise
    },

//Tasks
    GetTasks(todolistId:string) {
        const promise = axios.get(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}/tasks`, settings)
        //const promise = instanse.get(`${'todo-lists'}`)
        return promise
    },



}