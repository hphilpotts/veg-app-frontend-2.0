import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import { MenuItem, Stack, FormControl, TextField, InputLabel, Select, Button } from '@mui/material';
import { PageTitle } from '../components/PageTitle';

import { subCategoriesWithDocumentKeys as documentCategories } from '../utils/foodCategories';

import { UserContext } from '../App';

export const CreateFood = () => {

    const user = useContext(UserContext);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [formData, setFormData] = useState({ item: '', category: '' });

    const handleCategorySelectChange = e => {
        setSelectedCategory(e.target.value);
    };

    const handleTextInput = e => {
        const updatedFormData = { ...formData };
        updatedFormData.item = e.target.value;
        setFormData(updatedFormData);
    };

    const handleSubmitForm = () => {
        const completedFormData = {...formData};
        completedFormData.user = user.id;
        completedFormData.category = documentCategories[selectedCategory];
        completedFormData.action = 'add';
        // TODO - implement Axios call w/ completed data
        console.log('completed form data:');
        console.log(completedFormData);
    };

    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user.loggedIn) {
            navigateTo('/');
        };
    }, [user]);

    const categoryMenuItems = Object.keys(documentCategories).map(key => (<MenuItem value={key} key={uuid()}>{key}</MenuItem>));

    // TODO - implement add and log functionality

    return (
        <>
            <PageTitle titleText={'create food'} />
            <Stack spacing={1}>
                <TextField label='food name' value={formData.item} onChange={handleTextInput} />
                <FormControl>
                    <InputLabel id="category-select-input-label">category</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={handleCategorySelectChange}
                        label="category"
                        labelId="category-select-input-label">
                        {categoryMenuItems}
                    </Select>
                </FormControl>
                <Button variant='contained' onClick={() => handleSubmitForm()}>add new food</Button>
                {/* <Button variant='outlined'>add and log for today</Button> */}
            </Stack>
        </>
    );
};