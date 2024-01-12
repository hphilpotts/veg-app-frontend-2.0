import React from 'react';

import { v4 as uuid } from 'uuid';

import { Autocomplete, TextField } from '@mui/material';

export const AddFoodButton = ({ foods }) => {

    if (foods) {
        return (
            <Autocomplete
                disablePortal
                options={foods}
                sx={{ width: 300 }}
                renderOption={(props, option) => {
                    return (
                        <p {...props} key={uuid()}>
                            {option}
                        </p>
                    )
                }}
                renderInput={(params) => <TextField {...params} label="food" />}
            />
        )

    } else {
        return (
            <p> : </p>
        )
    }


}