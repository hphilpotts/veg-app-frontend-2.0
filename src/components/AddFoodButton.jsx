import React from 'react';

import { v4 as uuid } from 'uuid';

import { Autocomplete, TextField, Container } from '@mui/material';

export const AddFoodButton = ({ foodsIndex, containerStyle }) => {

    if (foodsIndex) {

        return (
            <Container sx={containerStyle}>
                <Autocomplete
                    disablePortal
                    options={foodsIndex}
                    sx={{ width: 300 }}
                    renderOption={(props, option) => (<li {...props} key={uuid()}>{option}</li>)}
                    renderInput={(params) => <TextField {...params} label="search" />}
                />
            </Container>

        );

    } else {

        return (
            <TextField sx={{ width: 300 }} />
        );

    };

};