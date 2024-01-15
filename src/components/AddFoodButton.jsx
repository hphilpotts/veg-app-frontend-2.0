import React from 'react';

import { v4 as uuid } from 'uuid';

import { Autocomplete, TextField, Container, Stack, Button, Typography } from '@mui/material';

export const AddFoodButton = ({ foodsIndex, containerStyle }) => {

    if (foodsIndex) {

        return (
            <Container sx={containerStyle}>
                <Stack direction={'row'}>
                    <Autocomplete
                        disablePortal
                        options={foodsIndex}
                        sx={{ width: 275 }}
                        renderOption={(props, option) => (<li {...props} key={uuid()}>{option}</li>)}
                        renderInput={(params) => <TextField {...params} label="search" />}
                    />
                    <Container sx={{ width: '75px' }}>
                        <Button key={uuid()} variant='contained' color='primary'>
                            <Typography variant='h4' sx={{ textTransform: 'lowercase' }}>+</Typography>
                        </Button>
                    </Container>
                </Stack>
            </Container>

        );

    } else {

        return (
            <TextField sx={{ width: 300 }} />
        );

    };

};