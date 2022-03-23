import React, {ChangeEvent, useState} from "react";
import {v1} from "uuid";
import MyButton from "./Components/MyButton/MyButton";

export type FilterOptionsType = "all" | "active" | "completed";

type TodoListPropsType = {
    tasks: Array<TasksPropType>
    callBackDeleteTask: (id: string) => void
    callBackSetFilterCurrent: (filter: FilterOptionsType) => void
    callBackChecked: (id: string, currentCheck: boolean) => void
    callBackAdd: (newTitle: string) => void
}
export type TasksPropType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList: React.FC<TodoListPropsType> = ({
                                                   tasks, callBackDeleteTask,
                                                   callBackSetFilterCurrent, callBackChecked,
                                                   callBackAdd
                                               }) => {

    const [input, setInput] = useState<string>("")

    const onClickDeleteHandler = (id: string) => {
        callBackDeleteTask(id)
    }
    const onClickChangeFilter = (filter: FilterOptionsType) => {
        callBackSetFilterCurrent(filter)
    }
    const onChangeChecboxHandler = (id: string, currentCheck: boolean) => {
        callBackChecked(id, currentCheck)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }
    const onClickAdd = () => {
        callBackAdd(input)
    }

    return (
        <div className="App">
            <div>
                <h3>What to learn</h3>
                <div>
                    <input
                        value={input}
                        onChange={onChangeInputHandler}/>
                    <MyButton callBack={onClickAdd} name={"Add"}/>
                </div>
                <ul>
                    {tasks.map((el) => <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}
                               onChange={(e) => onChangeChecboxHandler(el.id, e.currentTarget.checked)}/>
                        <span>{el.title}</span>
                        <MyButton callBack={() => onClickDeleteHandler(el.id)} name={"Del"}/>
                    </li>)}

                </ul>
                <div>
                    <MyButton callBack={() => onClickChangeFilter("all")} name={"All"}/>
                    <MyButton callBack={() => onClickChangeFilter("active")} name={"Active"}/>
                    <MyButton callBack={() => onClickChangeFilter("completed")}name={"Completed"}/>
                </div>
            </div>
        </div>
    );


}
export default TodoList