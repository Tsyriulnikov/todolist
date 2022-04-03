import React, {ChangeEvent, useState} from "react";
import {FilterType} from "./App";
import s from "./TodoList.module.css"

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListsPropsType = {
    tasks: Array<TasksPropsType>
    title: string
    idTodoList: string
    filter: FilterType
    callBackChangeFilter: (idTodoList: string, currentFilter: FilterType) => void
    callBackAddTask: (idTodoList: string, title: string) => void
    callBackDeleteTask: (idTodoList: string, idTask: string) => void
    callBackDeleteTodoList: (idTodoList: string) => void
    callBackIsDone: (idTodoList: string, idTask: string, isDone: boolean) => void
}
const TodoList: React.FC<TodoListsPropsType> = ({tasks, ...allprops}) => {

    let [inputValue, setInputValue] = useState<string>("")
    let [error, setError] = useState<string>("")

    const onClickFilterHandler = (currentFilter: FilterType) => {
        allprops.callBackChangeFilter(allprops.idTodoList, currentFilter)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError('')
    }
    const onClickAddTaskHandler = () => {
        if (inputValue.trim() !== '') {
            allprops.callBackAddTask(allprops.idTodoList, inputValue)
            setInputValue('')
            setError('')
        } else setError('Is requaire title')
    }
    const onClickDeleteTaskHandler = (idTask: string) => {
        allprops.callBackDeleteTask(allprops.idTodoList, idTask)
    }
    const onClickDeleteTodoList = () => {
        allprops.callBackDeleteTodoList(allprops.idTodoList)
    }
    const onChangeCheckedHandler = (idTask: string, isDone: boolean) => {
        allprops.callBackIsDone(allprops.idTodoList, idTask, isDone)
    }
    const onKeyPressHandler = (key: string) => {
        if (key === "Enter") {
            onClickAddTaskHandler()

        }
    }
    return (
        <div>
            <h3>{allprops.title}
                <button onClick={onClickDeleteTodoList}>X</button>
            </h3>
            <div>
                <input
                    value={inputValue}
                    onChange={onChangeInputHandler}
                    onKeyPress={(e) => onKeyPressHandler(e.key)}
                />
                <button onClick={onClickAddTaskHandler}>+</button>
                {error &&  <div className={s.errorInput}>{error}</div>}
            </div>

            <ul>
                {tasks.map((el: TasksPropsType) => {
                    return (
                        <li key={el.id}><input
                            type="checkbox"
                            onChange={(e) => onChangeCheckedHandler(el.id, e.currentTarget.checked)}
                            checked={el.isDone}/> <span>{el.title}</span>
                            <button onClick={() => onClickDeleteTaskHandler(el.id)}>Del</button>

                        </li>)
                })
                }
            </ul>
            <div>
                <button className={allprops.filter === 'all' ? s.currentFilter : ''}
                        onClick={() => onClickFilterHandler('all')}>All
                </button>
                <button
                    className={allprops.filter === 'active' ? s.currentFilter : ''}
                    onClick={() => onClickFilterHandler('active')}>Active
                </button>
                <button
                    className={allprops.filter === 'completed' ? s.currentFilter : ''}
                    onClick={() => onClickFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>

    )

}
export default TodoList