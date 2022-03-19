import React, {ChangeEvent,KeyboardEvent} from "react";

type InputPropsType = {
    inputState: string
    setInputState: (inputState: string) => void
    callBackOnKeyPress:()=>void
}

const Input: React.FC<InputPropsType> = ({inputState, setInputState,callBackOnKeyPress}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputState(e.currentTarget.value)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
if(e.key==="Enter") callBackOnKeyPress()
    }


    return (
        <input
            value={inputState}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
        />
    )
}
export default Input