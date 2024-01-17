import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuid } from 'uuid';

import Axios from 'axios';
import { xAuth } from '../../utils/axiosConfig';

import { Stack, Container } from '@mui/material';

import { DateScroller } from '../../components/DateScroller';
import { AddFoodButton } from '../../components/AddFoodButton';
import { PageTitle } from '../../components/PageTitle';

import { flexColumnCentered as center } from '../../utils/muiTheme';
import { getFoods } from '../../utils/foodHelpers';
import { getDayName } from '../../utils/dateHelpers';

import { UserContext } from '../../App';

export const AddFood = () => {

    const user = useContext(UserContext);

    const [activeDay, setActiveDay] = useState(new Date()); // inits as today

    const [foodsIndex, setFoodsIndex] = useState(null);

    const [dayData, setDayData] = useState(null);

    const getAllFoods = async user => {

        const allFoodsOutput = [];
        const foodsCollection = await getFoods(user, null);

        // filter non-food keys from returned object
        const categoryKeys = Object.keys(foodsCollection.Foods).filter(key => key[0] != '_' && key != 'user');

        categoryKeys.forEach(categoryKey => allFoodsOutput.push(foodsCollection.Foods[categoryKey]));

        setFoodsIndex(allFoodsOutput.flat());

    };

    const getDayData = async (user, date) => {
        const urlDate = date.toISOString().split('T')[0];
        const requestUrl = `/api/week/find?user=${user.id}&date=${urlDate}`;
        try {
            const res = await Axios.get(requestUrl, xAuth(user.token));
            setDayData(res.data.Week[getDayName(date)]);
        } catch (error) {
            // if a null TypeError then day has no food data, set to null; otherwise log other errors to the console
            error.message.includes('Cannot read properties of null') ? setDayData(null) : console.error(error);
        };
    };

    const handleDateScroll = newDate => {
        setActiveDay(newDate);
        getDayData(user, newDate); // user is from useContext above
    };

    const handleLogFood = async foodItem => {
        const requestUrl = `api/week/update`;
        const day = getDayName(activeDay);
        const requestBody = { id: user.id, day: day, newData: foodItem };
        try {
            console.log(requestUrl)
            console.log(requestBody)
            // const res = await Axios.put(requestUrl, requestBody, xAuth(user.token));
            return res;
        } catch (error) {
            console.error(error);
            return error;
        };
    };

    const navigateTo = useNavigate();

    useEffect(() => {

        if (!user.loggedIn) {
            navigateTo('/');
        } else {
            getAllFoods(user);
            getDayData(user, activeDay);
        };

    }, [user]);

    const containerStyle = { height: '10%', ...center }

    let foodItemsList;

    if (dayData) {
        foodItemsList = dayData.map(foodItem => <p key={uuid()}>{foodItem}</p>)
    } else {
        foodItemsList = null;
    }

    return (
        <Stack sx={{ height: '90vh', width: '100vw' }}>
            <TitleContainer containerStyle={containerStyle} />
            <DateScroller activeDay={activeDay} handleDateScroll={handleDateScroll} />
            <AddFoodButton containerStyle={containerStyle} foodsIndex={foodsIndex} handleLogFood={handleLogFood} />
            <Container sx={{ height: '70%', overflow: 'scroll' }}>
                {foodItemsList}
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