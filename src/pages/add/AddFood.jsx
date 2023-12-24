import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { Container, ButtonGroup, Button, Typography, Select, MenuItem, FormControl, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { flexColumnCentered as center, topMargin } from '../../utils/muiTheme';
import { PageTitle } from '../../components/PageTitle';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';

import { getFoods } from '../../utils/foodHelpers';
import { subCategoriesWithEmojis as categoryData, subCategoriesWithDocumentKeys as keysForSubCategory } from '../../utils/foodCategories';

import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

// TODO - should probably break this out into separate files

const mainCategoryOptions = Object.keys(categoryData); // ['veg', 'fruit', 'misc'] 

export const AddFood = () => {

    const defaultMainCategory = mainCategoryOptions[0] // 'veg'
    const [mainCategory, setMainCategory] = useState(defaultMainCategory);

    const defaultSubCategory = Object.keys(categoryData[defaultMainCategory])[0]; // top item in Select component within SubCategorySelector
    const [subCategory, setSubCategory] = useState(defaultSubCategory);

    const [foodsList, setFoodsList] = useState([]);

    const user = useContext(UserContext);

    const setNewCategory = item => {
        setMainCategory(item);
        const newDefaultSubCategory = Object.keys(categoryData[item])[0]; // first sub category option for new main category
        setSubCategory(newDefaultSubCategory);
        populateFoodItems(newDefaultSubCategory);
    };

    const populateFoodItems = async selectedSubCategory => { // called on first render then subsequent changes to either main category state or sub category state
        const categoryKey = keysForSubCategory[selectedSubCategory];
        const response = await getFoods(user, categoryKey);
        setFoodsList(response.Category);
    };

    const [selectedFood, setSelectedFood] = useState('');

    const handleFoodSelect = event => {
        setSelectedFood(event.target.value);
    };

    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user.loggedIn) {
            navigateTo('/');
        } else {
            populateFoodItems(subCategory);
        };
    }, [user]);

    if (!user.loggedIn) {
        return (<LoadingSkeleton />);
    };

    return (

        // full page with main components below
        <>
            <PageTitle titleText={'log new foods'} />
            <MainCategorySelector mainCategory={mainCategory} setMainCategory={setNewCategory} />
            <SubCategorySelector mainCategory={mainCategory} subCategory={subCategory} setSubCategory={setSubCategory} populateFoodItems={populateFoodItems} />
            <FoodItemSelector foodItemsList={foodsList} selectedFood={selectedFood} handleFoodSelect={handleFoodSelect} />
            <AddFoodButton selectedFood={selectedFood} />
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


const SubCategorySelector = ({ setSubCategory, mainCategory, subCategory, populateFoodItems }) => {

    const mainCategoryObject = categoryData[mainCategory];

    const handleChange = event => {
        setSubCategory(event.target.value);
        populateFoodItems(event.target.value);
    };

    return (

        // select sub category component - options populated depending on main category selected above
        <Container sx={{ ...center, ...topMargin }}>
            <FormControl fullWidth sx={{ maxWidth: '300px', textTransform: 'lowercase' }}>
                <FormHelperText>select a category</FormHelperText>
                <Select
                    value={subCategory}
                    onChange={handleChange}
                    displayEmpty
                >
                    {Object.keys(mainCategoryObject).map(key => (
                        <MenuItem value={key} sx={{ textTransform: 'lowercase' }} key={uuid()} >{`${key} ${mainCategoryObject[key]}`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Container>

    );
};

const FoodItemSelector = ({ foodItemsList, selectedFood, handleFoodSelect }) => {
    if (!foodItemsList.length) {
        return <LoadingSkeleton count={8} />
    } else {
        return (
            <FormControl >
                <RadioGroup name='food-item-selector-group' value={selectedFood} onChange={handleFoodSelect} >
                    {foodItemsList.map(item => (
                        <FormControlLabel value={item} control={<Radio />} label={item} key={uuid()} />
                    ))}
                </RadioGroup>
            </FormControl>
        );
    };
};

const AddFoodButton = ({ selectedFood }) => {

    const handleClick = () => {
        console.log(selectedFood);
    }

    return (
        <Container sx={center}>
            <Button key={uuid()} variant='contained' color='primary'>
                <Typography variant='h6' onClick={handleClick} sx={{ textTransform: 'lowercase' }}>add food</Typography>
            </Button>
        </Container>
    )
}