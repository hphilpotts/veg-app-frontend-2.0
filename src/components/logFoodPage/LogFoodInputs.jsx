import React, { useState } from 'react';

import { v4 as uuid } from 'uuid';

import { Autocomplete, TextField, Container, Stack, Button, Typography, Select } from '@mui/material';

export const LogFoodInputContainer = ({ inputMode, foodOptions, handleLogFood }) => {

    if (foodOptions) {
        return (
            <Container sx={{height: '30%', justifyContent: 'center', ...center}}>
                <Stack direction={'row'} flexWrap={'wrap'} width={350}>
                    <p>search placeholder</p>
                    <p>category placeholder</p>
                    <p>fav placeholder</p>
                </Stack>
            </Container>
        )
    } else {
        return (
            <TextField sx={{ width: 300, height: '30%' }} />
        )
    }

}

// TODO - reshape below components as children of above LogFoodInputContainer

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
            <TextField sx={{ width: 300, height: '30%' }} />
        );

    };

};

export const LogFoodCategoryInput = ({ containerStyle, foodOptions }) => {

    return (
        <Container sx={containerStyle}>
            <Stack direction={'row'} flexWrap={'wrap'} width={350}>
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
            </Stack>
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