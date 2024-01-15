import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';
import { xAuth } from '../../utils/axiosConfig';

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

    const [weekData, setWeekData] = useState(null);

    const getAllFoods = async user => {

        const allFoodsOutput = [];
        const foodsCollection = await getFoods(user, null);

        // filter non-food keys from returned object
        const categoryKeys = Object.keys(foodsCollection.Foods).filter(key => key[0] != '_' && key != 'user');

        categoryKeys.forEach(categoryKey => allFoodsOutput.push(foodsCollection.Foods[categoryKey]));

        setFoodsIndex(allFoodsOutput.flat());

    };

    const getWeek = async (user, date) => {
        const urlDate = date.toISOString().split('T')[0];
        const requestUrl = `/api/week/find?user=${user.id}&date=${urlDate}`;
        try {
            const res = await Axios.get(requestUrl, xAuth(user.token));
            console.log(res.data);
            setWeekData(res.data);
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    const navigateTo = useNavigate();

    useEffect(() => {

        if (!user.loggedIn) {
            navigateTo('/');
        } else {
            getAllFoods(user);
            getWeek(user, activeDay);
        };

    }, [user]);

    const containerStyle = { height: '10%', ...center }

    return (
        <Stack sx={{ height: '90vh', width: '100vw' }}>
            <TitleContainer containerStyle={containerStyle} />
            <DateScroller activeDay={activeDay} setActiveDay={setActiveDay} />
            <AddFoodButton containerStyle={containerStyle} foodsIndex={foodsIndex} />
            <button onClick={() => getWeek(user, activeDay)}></button>
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

const TitleContainer = ({ containerStyle }) => {
    return (
        <Container sx={containerStyle}>
            <PageTitle titleText={'log new foods'} />
        </Container>
    )
}