import React, { useState } from 'react';

import { v4 as uuid } from 'uuid';

import { Autocomplete, TextField, Container, Stack, Button, Typography, Select } from '@mui/material';

import { flexColumnCentered as center } from '../../utils/muiTheme';

export const LogFoodInputContainer = ({ inputMode, foodOptions, handleLogFood }) => {

    if (foodOptions) {
        return (
            <Container sx={{ height: '30%', justifyContent: 'center', ...center }}>
                <Stack direction={'row'} flexWrap={'wrap'} width={350}>
                    <LogFoodSearchInput isActive={inputMode === 'search'} foodOptions={foodOptions} handleLogFood={handleLogFood} />
                    <LogFoodCategoryInput isActive={inputMode === 'category'} foodOptions={foodOptions} />
                    <LogFoodFavouritesInput isActive={inputMode === 'favourites'} />
                </Stack>
            </Container>
        )
    } else {
        return (
            // TODO - swap w/ loading skeleton
            <TextField sx={{ width: 300, height: '30%' }} />
        );
    };

};

export const LogFoodSearchInput = ({ isActive, foodOptions, handleLogFood }) => {

    const [selectedFood, setSelectedFood] = useState(null);

    const addFoodClickHandler = selectedFood => {
        handleLogFood(selectedFood);
    };

    if (Array.isArray(foodOptions) && isActive) { // array check required where foodOptions may be Object, prevents prop fail from Autocomplete
        return (
            <>
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
            </>
        );
    };

    return null;

};

export const LogFoodCategoryInput = ({ isActive, foodOptions }) => {

    if (isActive) {
        return (
            <>
                <Select sx={{ width: 275, marginBottom: '5px' }} value='placeholder'>

                </Select>
                <Autocomplete
                    disablePortal
                    options={foodOptions}
                    renderOption={(props, option) => (<li {...props} key={uuid()}>{option}</li>)}
                    renderInput={(params) => <TextField {...params} label="search" />}
                    onChange={(e, value) => setSelectedFood(value)}
                    sx={{ width: 275 }}
                />
                <Container sx={{ width: '75px' }}>
                    <Button onClick={() => addFoodClickHandler(selectedFood)} key={uuid()} variant='contained' color='primary'>
                        <Typography variant='h4' sx={{ textTransform: 'lowercase' }}>+</Typography>
                    </Button>
                </Container>
            </>
        );
    };

    return null;
};

export const LogFoodFavouritesInput = ({ isActive }) => {

    if (isActive) {

        return (
            <p>Favourites Button</p>
        );
    };

    return null;

};