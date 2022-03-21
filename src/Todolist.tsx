import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import Button from "./components/Button";
import Input from "./components/Input";

type TodoListPropsType = {
    title: string
    task: Array<TaskPropsType>
    removeTask: (currentId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeCheckBox: (currentId: string, isDone: boolean) => void
}
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
export const TodoList = (props: TodoListPropsType) => {

    let [inputValue, setInputValue] = useState<string>('')

    const onClickDeleteHandler = (currentId: string) => {
        props.removeTask(currentId)
    }

    const onClickChangeFilterHandler = (newFilter: FilterValuesType) => {
        props.changeFilter(newFilter)
    }


    const addButtonHandler = () => {
        props.addTask(inputValue)
        setInputValue("")
    }

    const changeCheckBox = (currentId: string, isDone: boolean) => {
        props.changeCheckBox(currentId, isDone)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input inputState={inputValue} setInputState={setInputValue}
                       callBackOnKeyPress={addButtonHandler}/>

                <Button callBack={addButtonHandler} nameButton={"Add"}/>

            </div>
            <ul>
                {props.task.map((el: TaskPropsType) => {

                        const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
                            changeCheckBox(el.id, e.currentTarget.checked)

                        }
                        return (
                            <li key={el.id}><input type="checkbox"

                                                   onChange={onChangeCheckBox}


                                                   checked={el.isDone}/> <span>{el.title}</span>
                                <Button nameButton={"Delete"} callBack={() => onClickDeleteHandler(el.id)}/>
                            </li>
                        )
                    }
                )
                }

            </ul>
            <div>
                <Button callBack={() => onClickChangeFilterHandler("all")} nameButton={"All"}/>
                <Button callBack={() => onClickChangeFilterHandler("active")} nameButton={"Active"}/>
                <Button callBack={() => onClickChangeFilterHandler("completed")} nameButton={"Completed"}/>
            </div>
        </div>
    );
}