import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";

type  EditebleSpanType = {
    title: string
    callBackChangeTask:(title:string)=>void
}
export const EditebleSpan: React.FC<EditebleSpanType> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.callBackChangeTask(title)
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
const keyPressEnterHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        setEditMode(false)
        props.callBackChangeTask(title)
    }
}
    return (

        editMode ?
            <input value={title}
                   onKeyPress={keyPressEnterHendler}
                   onChange={changeTitleHandler}
                   onBlur={activateViewMode}
                   autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>

    )

}