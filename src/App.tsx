import React, {useState} from "react";
import "./App.css";
import {TodoList, TaskPropsType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all")
    const removeTask = (currentId: string) => {
        const newTasks = tasks.filter((el) => el.id !== currentId)
        setTasks(newTasks)
    }

    const addTask = (newTitle:string) => {
      let newTask = {id:v1(), title: newTitle, isDone: true }
    setTasks([newTask, ...tasks])
    }

   const changeStatus = (currentId:string, isDone:boolean) => {
        let task = tasks.find((el)=> el.id === currentId)
       if (task) {
task.isDone=isDone
setTasks([...tasks])
       }

   }

    const changeFilter = (newFilter: FilterValuesType) => {
        setFilter(newFilter)
    }

    let tasksForTodoList = tasks
    if (filter === 'completed') {tasksForTodoList= tasks.filter((el)=> el.isDone)}
    if (filter === 'active') {tasksForTodoList= tasks.filter((el)=> !el.isDone)}

    return (
        <div className="App">
            <TodoList title={'Список'} task={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeCheckBox={changeStatus}
            />

        </div>
    );
}

export default App;
