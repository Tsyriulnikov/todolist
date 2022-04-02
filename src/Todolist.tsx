import React, {ChangeEvent, useState} from "react";
import {FilterType} from "./App";


export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListsPropsType = {
    tasks: Array<TasksPropsType>
    title: string
    idTodoList: string
    callBackChangeFilter: (idTodoList: string, currentFilter: FilterType) => void
    callBackAddTask: (idTodoList: string, title: string) => void
}
const TodoList: React.FC<TodoListsPropsType> = ({tasks, ...allprops}) => {

    let [inputValue, setInputValue] = useState<string>("")

    const onClickFilterHandler = (currentFilter: FilterType) => {
        allprops.callBackChangeFilter(allprops.idTodoList, currentFilter)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const onClickAddTaskHandler = () => {
        allprops.callBackAddTask(allprops.idTodoList, inputValue)
    }

    return (
        <div>
            <h3>{allprops.title}</h3>
            <div>
                <input
                    value={inputValue}
                    onChange={onChangeInputHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map((el: TasksPropsType) => {
                    return (
                        <li key={allprops.idTodoList}><input
                            type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>)
                })
                }
            </ul>
            <div>
                <button onClick={() => onClickFilterHandler('all')}>All</button>
                <button onClick={() => onClickFilterHandler('active')}>Active</button>
                <button onClick={() => onClickFilterHandler('completed')}>Completed</button>
            </div>
        </div>

    )

}
export default TodoList