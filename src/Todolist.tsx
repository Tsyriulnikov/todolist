import React, {ChangeEvent, useState} from "react";
import {FilterType} from "./App";
import s from "./TodoList.module.css"

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type  TodoListPropsType = {
    tasks: Array<TaskType>
    callBackDelete: (id: string) => void
    callBackFilter: (filter: FilterType) => void
    currentFilter: FilterType
    callBackCheckBox: (id: string, currenIsDone: boolean) => void
    callBackAdd:(titleInput:string) => void
}

const TodoList: React.FC<TodoListPropsType> = ({tasks, callBackDelete,  callBackFilter, ...props}) => {

    const [titleInput, setTitleInput] = useState<string>("")

    const onClickDeleteHandler = (id: string) => {
        callBackDelete(id)
    }

    const onClickFilterHandler = (filter: FilterType) => {
        callBackFilter(filter)
    }

    const onChangeCheckBoxHandler = (id: string, currentIsDone: boolean) => {
        props.callBackCheckBox(id, currentIsDone)
    }

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(event.currentTarget.value)
    }
    const onClickAddHandler = () => {
        setTitleInput('')
        props.callBackAdd(titleInput)
    }
    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input
                    value={titleInput}
                    onChange={onChangeInput}/>
                <button onClick={onClickAddHandler}>+</button>
            </div>
            <ul>
                {tasks.map(el => <li key={el.id}>
                        <input type="checkbox"
                               onChange={(e) => onChangeCheckBoxHandler(el.id, e.currentTarget.checked)}
                               checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={() => onClickDeleteHandler(el.id)}>Delete</button>
                    </li>
                )}

            </ul>
            <div>
                <button className={props.currentFilter === "all" ? s.currentFilter : ""}
                        onClick={() => onClickFilterHandler("all")}>All
                </button>
                <button className={props.currentFilter === "active" ? s.currentFilter : ""}
                        onClick={() => onClickFilterHandler("active")}>Active
                </button>
                <button className={props.currentFilter === "completed" ? s.currentFilter : ""}
                        onClick={() => onClickFilterHandler("completed")}>Completed
                </button>
            </div>
        </div>
    )

}
export default TodoList