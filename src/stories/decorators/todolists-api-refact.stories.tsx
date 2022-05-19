import React, {useEffect, useState} from "react"
import axios from 'axios'
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
        todolistsApi.CreateTodoList()
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    // const todolistId = '82bc8a2a-c5b4-4ec2-b085-5a487c49ad77'

    useEffect(() => {
        todolistsApi.DeleteTodoList()
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    // const todolistId = '50e3e13d-0880-480f-a0f3-6be7db67a21d'
    useEffect(() => {
        todolistsApi.UpdateTodoListTitle()
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}