import React, {ChangeEvent} from "react";

type CheckBoxPropsType = {
    isDone:boolean
callBack:(currentEvent:boolean)=>void

}
const CheckBox:React.FC<CheckBoxPropsType>=({isDone,callBack}) => {

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
    }

    return(
        <input type="checkbox" checked={isDone}
        onChange={onChangeHandler}/>
    )

}
export default CheckBox