import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type MyInputProps = DefaultInputPropsType & {

}

const MyInput:React.FC<DefaultInputPropsType>=({})=>{
    return(
        <input/>
    )
}
export default MyInput