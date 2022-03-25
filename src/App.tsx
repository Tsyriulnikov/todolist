import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterType>("all")


    const deleteTask = (id: string) => {
        setTasks(tasks.filter(el => el.id != id))
    }

    let newTasks = tasks
    if (filter === "active") newTasks = tasks.filter(el => !el.isDone)
    if (filter === "completed") newTasks = tasks.filter(el => el.isDone)

    const changeIsDone = (id: string, currentIsDone: boolean) => {
        setTasks(tasks.map(el => el.id === id ? {...el, isDone: currentIsDone} : el))
    }

const addTask = (titleInput:string) =>{
        setTasks([{id: v1(), title: titleInput, isDone: false}, ...tasks])
    }
    return (
        <div className="App">
            <TodoList tasks={newTasks}
                      callBackDelete={deleteTask}
                      callBackFilter={setFilter}
                      currentFilter={filter}
                      callBackCheckBox={changeIsDone}
                      callBackAdd={addTask}
            />
        </div>
    );
}

export default App;
