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
                        <LogFoodCategoryInput isActive={inputMode === 'category'} foodOptions={foodOptions} handleLogFood={handleLogFood} />
                        <LogFoodFavouritesInput isActive={inputMode === 'favourites'} />
                    </>
                    : <LoadingSkeleton count={1} />
                }
            </Stack>
        </Container>
    );

};

const LogFoodSearchInput = ({ isActive, foodOptions, handleLogFood }) => {

    const [selectedFood, setSelectedFood] = useState(null);

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
                    <Button onClick={() => handleLogFood(selectedFood)} key={uuid()} variant='contained' color='primary'>
                        <Typography variant='h4' sx={{ textTransform: 'lowercase' }}>+</Typography>
                    </Button>
                </Container>
            </>
        );
    };

    return null;

};

const LogFoodCategoryInput = ({ isActive, foodOptions, handleLogFood }) => {

    const [category, setCategory] = useState("");
    const [categoryFoods, setCategoryFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState('');

    const handleCategoryChange = e => {
        setCategory(e.target.value);
        const newDocumentKey = documentCategories[e.target.value];
        setCategoryFoods(foodOptions[newDocumentKey]);
        setSelectedFood('');
    };

    const handleSelectFood = e => {
        setSelectedFood(e.target.value);
    };

    const categoryMenuItems = Object.keys(documentCategories).map(key => (<MenuItem value={key} key={uuid()}>{key}</MenuItem>));
    const foodItems = categoryFoods.map(food => <MenuItem value={food} key={uuid()}>{food}</MenuItem>);

    if (isActive) {
        return (
            <>
                {/* TODO - add labels */}
                <Select sx={{ width: 275, marginBottom: '5px' }} value={category} onChange={handleCategoryChange}>
                    {categoryMenuItems}
                </Select>
                <Select sx={{ width: 275 }} value={selectedFood} onChange={handleSelectFood} disabled={!category}>
                    {foodItems}
                </Select>
                <Container sx={{ width: '75px' }}>
                    {/* TODO - break add button into child component to reuse for all three options */}
                    <Button onClick={() => handleLogFood(selectedFood)} key={uuid()} variant='contained' color='primary'>
                        <Typography variant='h4' sx={{ textTransform: 'lowercase' }}>+</Typography>
                    </Button>
                </Container>
            </>
        );
    };

    return null;

};

const LogFoodFavouritesInput = ({ isActive }) => {
    // TODO - implement when backend updated
    if (isActive) {

        return (
            <p>Favourites Button</p>
        );
    };

    return null;

};