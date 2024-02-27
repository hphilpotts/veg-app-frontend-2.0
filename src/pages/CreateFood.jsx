import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import { MenuItem, Stack, FormControl, TextField, InputLabel, Select, Button, Divider } from '@mui/material';
import { PageTitle } from '../components/PageTitle';

import { subCategoriesWithDocumentKeys as foodDocumentCategories } from '../utils/foodCategories';
import { updateFoodsDocumentRequest } from '../utils/foodHelpers';

import { UserContext } from '../App';

export const CreateFood = () => {

    const user = useContext(UserContext);
    const [foodItem, setFoodItem] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleTextInput = e => {
        setFoodItem(e.target.value);
    };

    const handleCategorySelectChange = e => {
        setSelectedCategory(e.target.value);
    };

    const handleSubmitForm = async () => {

        const completedFormData = {
            user: user.id,
            category: foodDocumentCategories[selectedCategory],
            action: 'add',
            item: foodItem
        };

        const res = await updateFoodsDocumentRequest(user, completedFormData);

        if (res.status === 200) {
            setFoodItem('');;
            setSelectedCategory('');
        };

    };

    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user.loggedIn) {
            navigateTo('/');
        };
    }, [user]);

    const selectCategoryMenuItems = Object.keys(foodDocumentCategories).map(key => (<MenuItem value={key} key={uuid()}>{key}</MenuItem>));

    return (
        <>
            <PageTitle titleText={'create food'} />
            <Stack spacing={2}>
                <TextField id='food-item-input' label='food item name' value={foodItem} onChange={handleTextInput} type='text' autoComplete='disabled'/>
                <FormControl>
                    <InputLabel id="category-select-input-label">category</InputLabel>
                    <Select
                        id='category-select-input'
                        label="category"
                        labelId="category-select-input-label"
                        value={selectedCategory}
                        onChange={handleCategorySelectChange}>
                        {selectCategoryMenuItems}
                    </Select>
                </FormControl>
                <Button id='submit-button' aria-label='submit food item' variant='contained' onClick={() => handleSubmitForm()}>add new food</Button>
                {/* <Button variant='outlined'>add and log for today</Button> */}
                <Divider/>
                <Button onClick={() => console.log(navigateTo('/logFood/'))}>go to log foods</Button>
            </Stack>
        </>
    );
};