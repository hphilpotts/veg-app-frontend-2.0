import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Container, ButtonGroup, Button, Typography, Select, MenuItem, FormControl, FormHelperText } from '@mui/material';
import { flexColumnCentered as center, topMargin } from '../../utils/muiTheme';
import { PageTitle } from '../../components/PageTitle';

const mainCategories = ['veg', 'fruit', 'misc'];

const subCategories = {
    veg: {
        "Green Vegetables": "🥬",
        "Salad Vegetables": "🥒",
        "Salad Leaves": "🥗",
        "Root Vegetables": "🥕",
        "Onions & Friends": "🧅"
    },
    fruit: {
        "Orchard Fruits": "🍏",
        "Citrus Fruits": "🍋",
        "Exotic Fruits": "🥭",
        "Berries": "🍓",
        "Other Fruits": "🍇"
    },
    misc: {
        "Legumes & Pulses": "🌱",
        "Nuts & Seeds": "🥜",
        "Grains & Cereals": "🌾",
        "Herbs": "🌿",
        "Spices": "🌶️",
        "Sweeteners": "🍯",
        "Oils": "🫒",
        "Miscellaneous": "🥄"
    }
};

export const AddFood = () => {

    const [currentCategory, setCurrentCategory] = useState(mainCategories[0]);
    const defaultSubcategory = Object.keys(subCategories[currentCategory])[0];
    const [currentSubCategory, setCurrentSubCategory] = useState(defaultSubcategory);

    const setNewCategory = item => {
        setCurrentCategory(item);
        const newDefaultSubcategory = Object.keys(subCategories[item])[0];
        setCurrentSubCategory(newDefaultSubcategory);
    }

    return (
        <>
            <PageTitle titleText={'log new foods'} />
            <MainCategorySelector setCurrentCategory={setNewCategory} currentCategory={currentCategory} />
            <SubCategorySelector setCurrentSubCategory={setCurrentSubCategory} currentCategory={currentCategory} currentSubCategory={currentSubCategory} />
        </>
    );
};

const MainCategorySelector = ({ setCurrentCategory, currentCategory }) => {
    return (
        <Container sx={center}>
            <ButtonGroup variant='contained' size='large'>
                {mainCategories.map(item => {

                    let colour = 'primary';
                    if (item === currentCategory) colour = 'highlighted';

                    return (
                        <Button key={uuid()} color={colour}>
                            <Typography variant='h6' onClick={() => setCurrentCategory(item)} sx={{ textTransform: 'lowercase' }}>{item}</Typography>
                        </Button>
                    );
                })}
            </ButtonGroup>
        </Container>
    );
};

const SubCategorySelector = ({ setCurrentSubCategory, currentCategory, currentSubCategory }) => {

    const currentCategoryObject = subCategories[currentCategory];

    const handleChange = event => {
        setCurrentSubCategory(event.target.value);
    };

    return (
        <Container sx={{ ...center, ...topMargin }}>
            <FormControl fullWidth sx={{ maxWidth: '300px', textTransform: 'lowercase' }}>
                <Select
                    value={currentSubCategory}
                    onChange={handleChange}
                    displayEmpty
                >
                    {Object.keys(currentCategoryObject).map(key => (
                        <MenuItem value={key} sx={{ textTransform: 'lowercase' }} key={uuid()} >{`${key} ${currentCategoryObject[key]}`}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>select a category</FormHelperText>
            </FormControl>
        </Container>
    );
};