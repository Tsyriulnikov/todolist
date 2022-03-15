import React, {useState, KeyboardEvent, ChangeEvent} from 'react';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    tasksFilter: (filterValue: string) => void
    addTask: (newTitle: string) => void

}

export function Todolist(props: PropsType) {
    let [newTitle, setNewTitle] = useState("")


    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle("")
    }
const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>)=>
{
    if(e.key==="Enter") addTaskHandler()
}
const onChangeHanddler= (e:ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
}


const onFilterHandler = (filterValue:string) => {
    props.tasksFilter(filterValue)
}

    const removeTaskHandler=(idElem:string)=>{props.removeTask(idElem)}

return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeHanddler }/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map((el) => {


                return (
                    <li key={el.id}>
                        <button onClick={()=>removeTaskHandler(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={()=>onFilterHandler('All')}>All</button>
            <button onClick={()=>onFilterHandler("Active")}>Active</button>
            <button onClick={()=>onFilterHandler('Completed')}>Completed</button>
        </div>
    </div>
}
