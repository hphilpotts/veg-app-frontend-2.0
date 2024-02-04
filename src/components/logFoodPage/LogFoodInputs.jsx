import React, { useState } from 'react';

import { v4 as uuid } from 'uuid';

import { Autocomplete, TextField, Container, Stack, Button, Typography, Select, MenuItem } from '@mui/material';
import { LoadingSkeleton } from '../LoadingSkeleton';

import { flexColumnCentered as center } from '../../utils/muiTheme';
import { subCategoriesWithDocumentKeys as documentCategories } from '../../utils/foodCategories';

export const LogFoodInputContainer = ({ inputMode, foodOptions, handleLogFood }) => {

    return (
        <Container sx={{ height: '30%', justifyContent: 'center', ...center }}>
            <Stack direction={'row'} flexWrap={'wrap'} width={350}>
                {foodOptions ?
                    <>
                        <LogFoodSearchInput isActive={inputMode === 'search'} foodOptions={foodOptions} handleLogFood={handleLogFood} />
                        <LogFoodCategoryInput isActive={inputMode === 'category'} foodOptions={foodOptions} />
                        <LogFoodFavouritesInput isActive={inputMode === 'favourites'} />
                    </>
                    : <LoadingSkeleton count={1} />
                }
            </Stack>
        </Container>
    );

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

    const [category, setCategory] = useState("");
    const [categoryFoods, setCategoryFoods] = useState([]);

    const handleChange = e => {
        setCategory(e.target.value)
        const newDocumentKey = documentCategories[e.target.value]
        setCategoryFoods(foodOptions[newDocumentKey])
    }

    const categoryMenuItems = Object.keys(documentCategories).map(key => (<MenuItem value={key} key={uuid()}>{key}</MenuItem>));

    if (isActive) {
        return (
            <>
                <Select sx={{ width: 275, marginBottom: '5px' }} value={category} onChange={handleChange}>
                    {categoryMenuItems}
                </Select>
                <Select sx={{ width: 275 }}></Select>
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