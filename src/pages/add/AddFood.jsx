import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Container } from '@mui/material';

import { DateScroller } from '../../components/DateScroller';
import { AddFoodButton } from '../../components/AddFoodButton';
import { PageTitle } from '../../components/PageTitle';

import { flexColumnCentered as center } from '../../utils/muiTheme';
import { getFoods } from '../../utils/foodHelpers';

import { UserContext } from '../../App';

export const AddFood = () => {

    const user = useContext(UserContext);

    const [activeDay, setActiveDay] = useState(new Date()); // inits as today

    const [foodsIndex, setFoodsIndex] = useState(null);

    const getAllFoods = async user => {

        const allFoodsOutput = [];
        const foodsCollection = await getFoods(user, null);

        // filter non-food keys from returned object
        const categoryKeys = Object.keys(foodsCollection.Foods).filter(key => key[0] != '_' && key != 'user');

        categoryKeys.forEach(categoryKey => allFoodsOutput.push(foodsCollection.Foods[categoryKey]));

        setFoodsIndex(allFoodsOutput.flat());

    };

    const navigateTo = useNavigate();

    useEffect(() => {

        if (!user.loggedIn) {
            navigateTo('/');
        } else {
            getAllFoods(user);
        };

    }, [user]);

    return (
        <Stack sx={{ height: '90vh', width: '100vw' }}>
            <TitleContainer />
            <DateScroller activeDay={activeDay} setActiveDay={setActiveDay} />
            <AddFoodButtonContainer foodsIndex={foodsIndex} />
            <Container sx={{ height: '70%', overflow: 'scroll' }}>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
            </Container>
        </Stack>
    )

}

const TitleContainer = () => {
    return (
        <Container sx={{ height: '10%', ...center }}>
            <PageTitle titleText={'log new foods'} />
        </Container>
    )
}

const AddFoodButtonContainer = ({ foodsIndex }) => {
    return (
        <Container sx={{ height: '10%', ...center }}>
            <AddFoodButton foodsIndex={foodsIndex} />
        </Container>
    )
}