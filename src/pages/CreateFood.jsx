import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import { MenuItem, Stack, FormControl, TextField, InputLabel, Select, Button } from '@mui/material';
import { PageTitle } from '../components/PageTitle';

import { subCategoriesWithDocumentKeys as documentCategories } from '../utils/foodCategories';

import { UserContext } from '../App';

export const CreateFood = () => {

    const user = useContext(UserContext);

    const [category, setCategory] = useState("");

    const handleCategoryChange = e => {
        setCategory(e.target.value);
    };

    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user.loggedIn) {
            navigateTo('/');
        };
    }, [user]);

    const categoryMenuItems = Object.keys(documentCategories).map(key => (<MenuItem value={key} key={uuid()}>{key}</MenuItem>));

    return (
        <>
            <PageTitle titleText={'create food'} />
            <Stack spacing={1}>
                <TextField label='food name' />
                <FormControl>
                    <InputLabel id="category-select-input-label">category</InputLabel>
                    <Select
                        value={category}
                        onChange={handleCategoryChange}
                        label="category"
                        labelId="category-select-input-label">
                        {categoryMenuItems}
                    </Select>
                </FormControl>
                <Button variant='contained'>add new food</Button>
                <Button variant='outlined'>add and log for today</Button>
            </Stack>
        </>
    );
};