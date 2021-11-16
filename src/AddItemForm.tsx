import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((
    {
        addItem
    }
) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const add_Item = () => {
        if (title.trim() !== '') {
            addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            add_Item();
        }
    };

    return <div>
        <TextField variant="standard"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={add_Item}>
            <AddBoxTwoToneIcon/>
        </IconButton>
    </div>;
});
