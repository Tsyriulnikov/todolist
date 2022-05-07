import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType)=> {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
   if(error !== null) {
       setError(false);
   }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField id="outlined-basic" label="Title" variant="outlined" size="small"
               value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               // className={error ? "error" : ""}
        error={error}
        />
        <Button  onClick={addItem} variant="contained" size="small"
                 style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',backgroundColor:'forestgreen'}}
        >+</Button>

        {error && <div className="error-message">{error}</div>}
    </div>
});
