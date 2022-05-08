import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    },[])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    console.log(props.filter)
let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                        {/*<FormControlLabel control={<Checkbox defaultChecked onChange={onChangeHandler} checked={t.isDone}/>}/>*/}
                        <Checkbox  onChange={onChangeHandler} checked={t.isDone} />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon />
                        </IconButton>
                        {/*<Button onClick={onClickHandler}>x</Button>*/}
                    </li>
                })
            }
        </ul>
        <div>

            <Button variant={props.filter === 'all'  ? "outlined" : "contained"} color="secondary" onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active'  ? "outlined" : "contained"} color="success" onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed'  ? "outlined" : "contained"} color="error" onClick={onCompletedClickHandler}>Completed</Button>




        </div>
    </div>
})


