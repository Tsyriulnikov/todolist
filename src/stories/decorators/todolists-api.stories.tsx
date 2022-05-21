import React, {useEffect, useState} from "react"
import axios from 'axios'
// import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
    title: 'API'
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


export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // axios.get('https://social-network.samuraijs.com/api/1.0/todo-lists', settings)
        instanse.get(`${'todo-lists'}`)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // axios.post('https://social-network.samuraijs.com/api/1.0/todo-lists',{title:"First Todolist"}, settings)
        instanse.post(`${'todo-lists'}`, {title: "First Todolist"})
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '20b34cdb-5dfb-4f7a-a015-e2cd2a5c3f85'
    useEffect(() => {
        // axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}`, settings)
        instanse.delete(`${'todo-lists'}${todolistId}`)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '50e3e13d-0880-480f-a0f3-6be7db67a21d'
    useEffect(() => {
        // axios.put(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}`,{title:"First Changed"}, settings)
        // instanse.put(`${'todo-lists'}${'/50e3e13d-0880-480f-a0f3-6be7db67a21d'}`, {title: "First Changed again"})
        instanse.put(`${'todo-lists'}${todolistId}`, {title: "First Changed again"})
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}