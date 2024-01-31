import React, { useState } from 'react';

import { v4 as uuid } from 'uuid';

import { Autocomplete, TextField, Container, Stack, Button, Typography } from '@mui/material';

export const LogFoodSearchInput = ({ foodOptions, containerStyle, handleLogFood }) => {

    const [selectedFood, setSelectedFood] = useState(null);

    const addFoodClickHandler = selectedFood => {
        handleLogFood(selectedFood);
    };

    if (foodOptions && Array.isArray(foodOptions)) { // array check required where foodOptions may be Object, prevents prop fail from Autocomplete

        return (
            <Container sx={containerStyle}>
                <Stack direction={'row'}>
                    <Autocomplete
                        disablePortal
                        options={foodOptions}
                        sx={{ width: 275 }}
                        renderOption={(props, option) => (<li {...props} key={uuid()}>{option}</li>)}
                        renderInput={(params) => <TextField {...params} label="search" />}
                        onChange={(e, value) => setSelectedFood(value)}
                    />
                    <Container sx={{ width: '75px' }}>
                        <Button onClick={() => addFoodClickHandler(selectedFood)} key={uuid()} variant='contained' color='primary'>
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

export const LogFoodCategoryInput = ({ containerStyle }) => {
    return (
        <Container sx={containerStyle}>
            <p>Category Button</p>
        </Container>
    );
};

export const LogFoodFavouritesInput = ({ containerStyle }) => {
    return (
        <Container sx={containerStyle}>
            <p>Favourites Button</p>
        </Container>
    );
};