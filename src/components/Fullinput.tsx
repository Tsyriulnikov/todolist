import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type InputPropsType = {
callBack:(valueInput:string)=>void
}

const FullInput:React.FC<InputPropsType>=({callBack})=>{

let [title, setTitle] = useState("")

    const addTask = () => {
        callBack(title);
        setTitle("");
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
<div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
</div>

    )}
export default FullInput