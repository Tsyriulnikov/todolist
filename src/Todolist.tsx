import React, {useState} from 'react';
import {FilterValuesType} from './App';
import Input from "./components/Input";
import Button from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    titleName: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}


export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")


    {/*const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
*/
    }
    const changeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }


    const addNewTitle = () => {
        props.addTask(title)
        setTitle('')
    }


    return <div>
        <h3>{props.titleName}</h3>
        <div>
            {/*<FullInput callBack={props.addTask}/>*/}
            <Input inputState={title} setInputState={setTitle}
                   callBackOnKeyPress={addNewTitle}/>
            <Button callBack={addNewTitle} nameButton={"Add"}/>

        </div>

        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            {/*         <button onClick={ onAllClickHandler }>All</button>
            <button onClick={ onActiveClickHandler }>Active</button>
            <button onClick={ onCompletedClickHandler }>Completed</button>
        */}
            <Button callBack={() => changeFilterHandler("all")} nameButton={"All"}/>
            <Button callBack={() => changeFilterHandler("active")} nameButton={"Active"}/>
            <Button callBack={() => changeFilterHandler("completed")} nameButton={"Completed"}/>
        </div>
    </div>
}
