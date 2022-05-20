import React, {useEffect, useState} from "react"
import {todolistsApi} from "../../api/todolists-api";

export default {
    title: 'API-Refactoring'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.GetTodoLists()
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.CreateTodoList("new todolist")
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    // const todolistId = '82bc8a2a-c5b4-4ec2-b085-5a487c49ad77'

    useEffect(() => {
       const todolistId:string='cf5d2932-f8cb-4b13-8fc5-4d37c56a1a39'
        todolistsApi.DeleteTodoList(todolistId)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    const title:string = "Changed title"
    const todolistId:string = 'a208c081-67d0-45b1-89f9-fa84da819391'

    useEffect(() => {
        todolistsApi.UpdateTodoListTitle(todolistId,title)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

// Tasks

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId:string=''
        todolistsApi.GetTasks(todolistId)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
