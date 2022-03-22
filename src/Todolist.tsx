import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import style from "./Todolist.module.css"
import CheckBox from "./Components/CheckBox";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatusCheckBox: (currentId: string, currentEvent: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError("Error")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }



    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const checkBoxHandler = (currentId: string, currentEvent: boolean) => {
        props.changeStatusCheckBox(currentId, currentEvent)

    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? style.error : ''}
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={style.errorMessage}> {error} </div>}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id} className={t.isDone ? style.isDone : ""}>
                        {/*<input type="checkbox"*/}
                        {/*       onChange={(e) => checkBoxHandler(t.id, e.currentTarget.checked)}*/}
                        {/*       checked={t.isDone}/>*/}
                        <CheckBox isDone={t.isDone} callBack={(currentEvent)=>checkBoxHandler(t.id, currentEvent)}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter==="all" ? style.activeFilter: ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter==="active" ? style.activeFilter : ""} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter=== "completed" ? style.activeFilter: ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
