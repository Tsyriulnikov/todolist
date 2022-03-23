import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type MyButtonProps = DefaultButtonPropsType & {
    callBack:()=>void
}
const MyButton:React.FC<MyButtonProps>=({name,callBack,...restProps})=>{
    const clickHandler =()=>{
        callBack()
    }

    return (
        <button onClick={clickHandler}
                {...restProps}>{name}</button>
    )
}
export default MyButton