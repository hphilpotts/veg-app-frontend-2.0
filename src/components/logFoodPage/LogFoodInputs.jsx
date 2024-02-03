import React, { useState } from 'react';

import { v4 as uuid } from 'uuid';

import { Autocomplete, TextField, Container, Stack, Button, Typography, Select } from '@mui/material';

import { flexColumnCentered as center } from '../../utils/muiTheme';

export const LogFoodInputContainer = ({ inputMode, foodOptions, handleLogFood }) => {

    if (foodOptions) {
        return (
            <Container sx={{ height: '30%', justifyContent: 'center', ...center }}>
                <Stack direction={'row'} flexWrap={'wrap'} width={350}>
                    <LogFoodSearchInput foodOptions={foodOptions} handleLogFood={handleLogFood} />
                    {/* <LogFoodCategoryInput />
                    <LogFoodFavouritesInput /> */}
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

// TODO - reshape below components as children of above LogFoodInputContainer

export const LogFoodSearchInput = ({ foodOptions, handleLogFood }) => {

    const [selectedFood, setSelectedFood] = useState(null);

    const addFoodClickHandler = selectedFood => {
        handleLogFood(selectedFood);
    };

    if (foodOptions && Array.isArray(foodOptions)) { // array check required where foodOptions may be Object, prevents prop fail from Autocomplete

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
    } else {
        // TODO - swap w/ loading skeleton
        return <TextField sx={{ width: 300, height: '30%' }} /> 
    };
};

export const LogFoodCategoryInput = ({ foodOptions }) => {

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

export const LogFoodFavouritesInput = () => {
    return (
        <p>Favourites Button</p>
    );
};