import React, {useEffect, useState} from "react"
import axios from 'axios'
// import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
    title: 'API'
}
const settings = {
    withCredentials:true,
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
        // let promise = axios.get('https://social-network.samuraijs.com/api/1.0/todo-lists', settings)
        instanse.get(`${'todo-lists'}`)
        // let promise = instanse.get('https://social-network.samuraijs.com/api/1.0/todo-lists')
        .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.0/todo-lists',{title:"First Todolist"}, settings)
        // instanse.get(`${'todo-lists'}`)
            // let promise = instanse.get('https://social-network.samuraijs.com/api/1.0/todo-lists')
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {

}
export const UpdateTodoListTitle = () => {

}