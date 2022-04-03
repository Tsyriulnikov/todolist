import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksPropsType} from "./TodoList";
import {v1} from "uuid";


export type FilterType = "all" | "active" | "completed"
export type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksObjectType = {
    [key: string]: Array<TasksPropsType>
}
const App: React.FC = () => {

    const todoListId1 = v1()
    const todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, title: "What lern", filter: 'all'},
        {id: todoListId2, title: "What buy", filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksObjectType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Kolbasa", isDone: true},
            {id: v1(), title: "Vodka", isDone: false}]
    })

    const changeFilter = (idTodoList: string, currentFilter: FilterType) => {
        setTodoLists(todoLists.map(el => el.id === idTodoList ? {...el, filter: currentFilter} : el))
    }

    const addTask = (idTodoList: string, title:string) => {
       let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [idTodoList]:[newTask, ...tasks[idTodoList]]})
    }
const deleteTask = (idTodoList:string,idTask:string) =>{
        setTasks({...tasks,[idTodoList]:tasks[idTodoList].filter(el=>el.id!==idTask)})
}
const deleteTodoList = (idTodoList:string) => {
  setTodoLists(todoLists.filter(tl => tl.id !== idTodoList))
  const newTasks = {...tasks}
  delete newTasks[idTodoList]
  setTasks(newTasks)
}
const changeIsDone = (idTodoList: string, idTask:string, isDone:boolean) => {
   setTasks({...tasks, [idTodoList]:tasks[idTodoList].map(t => t.id===idTask ? {...t, isDone:isDone}:t)})
}

    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForTodoList = tasks[tl.id];
                (tl.filter === "completed") && (tasksForTodoList = tasks[tl.id].filter(t => t.isDone));
                (tl.filter === "active") && (tasksForTodoList = tasks[tl.id].filter(t => !t.isDone));
                return (
                    <TodoList
                        key={tl.id}
                        idTodoList={tl.id}
                        tasks={tasksForTodoList}
                        title={tl.title}
                        callBackChangeFilter={changeFilter}
                        callBackAddTask={addTask}
                        callBackDeleteTask={deleteTask}
                        callBackDeleteTodoList={deleteTodoList}
                        callBackIsDone={changeIsDone}
                        filter={tl.filter}
                    />


                )
            })}


        </div>
    );
}

export default App;
