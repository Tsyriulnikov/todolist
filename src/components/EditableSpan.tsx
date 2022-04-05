import React, {ChangeEvent,KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    callBack:(value:string)=>void
}

const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [value,setValue] = useState(props.title)

    const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
    }
    const onEditHandler = () => {setEditMode(true)}
    const offEditHandler = () => {
        setEditMode(false)
    props.callBack(value)
    }
const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") offEditHandler()
}

    return (
        <>
            {editMode ?
                <input
                    autoFocus
                    value={value}
                    onChange={onChangeInputHandler}
                    onBlur={offEditHandler}
                      onKeyPress={onKeyPressHandler}
                       />

                : <span onDoubleClick={onEditHandler}>{props.title}</span>
            }
        </>

    )
}
export default EditableSpan