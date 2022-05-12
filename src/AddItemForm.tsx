import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Box, Button, FormControl, IconButton, TextField} from "@mui/material";
// import {AddBox} from '@material-ui/icons';



type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm=memo((props: AddItemFormPropsType)=> {


    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <Button  onClick={addItem} variant="contained" size="small"
                 style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',backgroundColor:'forestgreen'}}
        >+</Button>

    </div>
})
