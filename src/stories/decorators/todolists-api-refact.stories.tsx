import React, {useEffect, useState} from "react"
import {todolistsApi} from "../../api/todolists-api";

export default {
    title: 'API-Refactoring'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodoLists()
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodoList("new todolist")
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    // const todolistId = '82bc8a2a-c5b4-4ec2-b085-5a487c49ad77'

    useEffect(() => {
        const todolistId: string = '3ad08e36-fce5-43b4-bc45-ea08fc3e478e'
        todolistsApi.deleteTodoList(todolistId)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    const title: string = "Changed title"
    const todolistId: string = '3ad08e36-fce5-43b4-bc45-ea08fc3e478e'

    useEffect(() => {
        todolistsApi.updateTodoListTitle(todolistId, title)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

// Tasks

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId: string = '3ad08e36-fce5-43b4-bc45-ea08fc3e478e'
        todolistsApi.getTasks(todolistId)
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const deleteTask = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}
