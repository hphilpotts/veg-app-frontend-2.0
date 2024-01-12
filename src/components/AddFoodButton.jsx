import React from 'react';

import { v4 as uuid } from 'uuid';

import { Autocomplete, TextField } from '@mui/material';

export const AddFoodButton = ({ foodsIndex }) => {

    if (foodsIndex) {

        return (
            <Autocomplete
                disablePortal
                options={foodsIndex}
                sx={{ width: 300 }}
                renderOption={(props, option) =>(<li {...props} key={uuid()}>{option}</li>)}
                renderInput={(params) => <TextField {...params} label="search" />}
            />
        );

    } else {

        return (
            <TextField sx={{ width: 300 }} />
        );

    };

};