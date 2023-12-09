import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Container, ButtonGroup, Button, Typography, Select, MenuItem, FormControl, FormHelperText } from '@mui/material';
import { flexColumnCentered as center, topMargin } from '../../utils/muiTheme';
import { PageTitle } from '../../components/PageTitle';

import { subCategoriesWithEmojis as categoryData } from '../../utils/foodCategories';

const mainCategoryOptions = Object.keys(categoryData); // ['veg', 'fruit', 'misc'] 

export const AddFood = () => {

    const defaultMainCategory = mainCategoryOptions[0] // 'veg'
    const [mainCategory, setMainCategory] = useState(defaultMainCategory);

    const defaultSubCategory = Object.keys(categoryData[defaultMainCategory])[0]; // top item in Select component within SubCategorySelector
    const [subCategory, setSubCategory] = useState(defaultSubCategory);

    const setNewCategory = item => {
        setMainCategory(item);
        const newDefaultSubCategory = Object.keys(categoryData[item])[0];
        setSubCategory(newDefaultSubCategory);
    };

    return (

        // full page with main components below
        <>
            <PageTitle titleText={'log new foods'} />
            <MainCategorySelector setMainCategory={setNewCategory} mainCategory={mainCategory} />
            <SubCategorySelector setSubCategory={setSubCategory} mainCategory={mainCategory} subCategory={subCategory} />
        </>

    );
};


const MainCategorySelector = ({ setMainCategory, mainCategory }) => {
    return (

        // select main category component
        <Container sx={center}>
            <ButtonGroup variant='contained' size='large'>
                {mainCategoryOptions.map(item => {

                    let colour = 'primary';
                    if (item === mainCategory) colour = 'highlighted';

                    return (
                        <Button key={uuid()} color={colour}>
                            <Typography variant='h6' onClick={() => setMainCategory(item)} sx={{ textTransform: 'lowercase' }}>{item}</Typography>
                        </Button>
                    );
                })}
            </ButtonGroup>
        </Container>

    );
};


const SubCategorySelector = ({ setSubCategory, mainCategory, subCategory }) => {

    const mainCategoryObject = categoryData[mainCategory];

    const handleChange = event => {
        setSubCategory(event.target.value);
    };

    return ( 
        
        // select sub category component - options populated depending on main category selected above
        <Container sx={{ ...center, ...topMargin }}>
            <FormControl fullWidth sx={{ maxWidth: '300px', textTransform: 'lowercase' }}>
                <Select
                    value={subCategory}
                    onChange={handleChange}
                    displayEmpty
                >
                    {Object.keys(mainCategoryObject).map(key => (
                        <MenuItem value={key} sx={{ textTransform: 'lowercase' }} key={uuid()} >{`${key} ${mainCategoryObject[key]}`}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>select a category</FormHelperText>
            </FormControl>
        </Container>

    );
};