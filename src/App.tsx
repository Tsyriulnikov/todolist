import React, {useState} from 'react';
import './App.css';
import TodoList, {FilterOptionsType, TasksPropType} from "./TodoList";
import {v1} from "uuid";


const App: React.FC<any> = () => {
    const [tasks, setTasks] = useState<Array<TasksPropType>>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ]
    )
    const [filterCurrent, setFilterCurrent] = useState<FilterOptionsType>("all")
    const deleteTask = (id: string) => {
        setTasks(tasks.filter((el) => id !== el.id))
    }
    const changeIsDone = (id: string, checkCurrent: boolean) => {
        setTasks(tasks.map((el) => el.id === id ? {...el, isDone: checkCurrent} : el))
    }

    let newTasks = tasks
    const filterTasks = (filter: FilterOptionsType) => {
        setFilterCurrent(filter)
    }
    if (filterCurrent === "active") newTasks = tasks.filter((el) => el.isDone);
    if (filterCurrent === "completed") newTasks = tasks.filter((el) => !el.isDone)

    const addTask = (newTitle: string) => {
        let task = {id: v1(), title: newTitle, isDone: false}
        setTasks([task, ...tasks])
    }
    return (
        <TodoList tasks={newTasks}
                  callBackDeleteTask={deleteTask}
                  callBackSetFilterCurrent={filterTasks}
                  callBackChecked={changeIsDone}
                  callBackAdd={addTask}/>
    );
}

export default App;
