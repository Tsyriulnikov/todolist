import React from "react";

type ButtonPropstype = {
    callBack: () => void
    nameButton:string
}

const Button: React.FC<ButtonPropstype> = ({callBack,nameButton}) => {

    const onClickHandler = () => {
        callBack()
    }
    return (
        <button onClick={onClickHandler}>{nameButton}</button>
    )
}
export default Button