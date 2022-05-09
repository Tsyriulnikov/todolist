import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    t: TaskType
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    todoListId: string
    key:string
}

export const Tasks = React.memo((props: TaskPropsType) => {


    const onClickHandler = () => props.removeTask(props.t.id, props.todoListId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.t.id, newIsDoneValue, props.todoListId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.t.id, newValue, props.todoListId);
    },[ props.changeTaskTitle,props.t.id,props.todoListId])


    return(
        <div key={props.t.id} className={props.t.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeHandler} checked={props.t.isDone}/>
            <EditableSpan value={props.t.title} onChange={onTitleChangeHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
})