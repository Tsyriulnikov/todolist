import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {Container, Grid, Paper} from "@mui/material";
import Header from "./Header";
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolist)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const removeTask = useCallback((id: string, todolistId: string) =>{
             dispatch(removeTaskAC(id, todolistId))
    },[dispatch])

    const addTask= useCallback((title: string, todolistId: string)=> {
        dispatch(addTaskAC(title, todolistId))
    },[dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) =>{
        dispatch(changeFilterTodoListAC(value, todolistId))
    },[dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string)=> {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    },[dispatch])

    const changeTaskTitle = useCallback( (id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    },[dispatch])

    const removeTodolist= useCallback((id: string)=> {
        dispatch(removeTodoListAC(id))
    },[dispatch])

    const changeTodolistTitle=useCallback((id: string, title: string) => {
        dispatch(changeTitleTodoListAC(title, id))
    },[dispatch])

    const addTodolist= useCallback((title: string)=> {
        const action = addTodoListAC(title);
        dispatch(action)
    },[dispatch])

    return (
        <div className="App">

            <Header/>

            <Container fixed>
                <Grid  container padding={8}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={8}>

                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;


                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })

                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
