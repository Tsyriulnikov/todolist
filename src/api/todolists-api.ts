import axios from "axios";

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
        const promise = axios.get('https://social-network.samuraijs.com/api/1.0/todo-lists', settings)
        // instanse.get(`${'todo-lists'}`)
        return promise
    },

    CreateTodoList() {
        const promise = axios.post('https://social-network.samuraijs.com/api/1.0/todo-lists', {title: "First Todolist"}, settings)
        // instanse.post(`${'todo-lists'}`, {title: "First Todolist"})

        return promise
    },

    DeleteTodoList() {
        const todolistId = '82bc8a2a-c5b4-4ec2-b085-5a487c49ad77'
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}`, settings)
        // instanse.delete(`${'todo-lists'}${todolistId}`)
        return promise
    },

    UpdateTodoListTitle() {
        const todolistId = '82bc8a2a-c5b4-4ec2-b085-5a487c49ad77'
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}`, {title: "First Changed"}, settings)
        // instanse.put(`${'todo-lists'}${'/50e3e13d-0880-480f-a0f3-6be7db67a21d'}`, {title: "First Changed again"})
        // instanse.put(`${'todo-lists'}${todolistId}`, {title: "First Changed again"})

        return promise
    }
}