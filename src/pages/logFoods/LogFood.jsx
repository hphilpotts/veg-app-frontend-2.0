import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';
import { xAuth } from '../../utils/axiosConfig';

import { Stack, Container } from '@mui/material';

import { DateScroller } from '../../components/DateScroller';
import { LogFoodButton } from '../../components/logFoodPage/LogFoodButton';
import { LogFoodDataDisplay } from '../../components/logFoodPage/LogFoodDataDisplay';
import { PageTitle } from '../../components/PageTitle';

import { flexColumnCentered as center } from '../../utils/muiTheme';
import { getFoods } from '../../utils/foodHelpers';
import { getDayName } from '../../utils/dateHelpers';

import { UserContext } from '../../App';

export const LogFood = () => {

    const user = useContext(UserContext);

    const [selectedDay, setSelectedDay] = useState(new Date()); // inits as today

    const [foodOptions, setFoodOptions] = useState(null);

    const [currentDayData, setCurrentDayData] = useState(null);
    const [originalDayData, setOriginalDayData] = useState(null);

    const getAllFoods = async user => {

        const allFoodsOutput = [];
        const foodsCollection = await getFoods(user, null);

        // filter non-food keys from returned object
        const categoryKeys = Object.keys(foodsCollection.Foods).filter(key => key[0] != '_' && key != 'user');

        categoryKeys.forEach(categoryKey => allFoodsOutput.push(foodsCollection.Foods[categoryKey]));

        setFoodOptions(allFoodsOutput.flat());

    };

    const getDayData = async (user, date) => {
        const urlDate = date.toISOString().split('T')[0];
        const requestUrl = `/api/week/find?user=${user.id}&date=${urlDate}`;
        try {
            const res = await Axios.get(requestUrl, xAuth(user.token));
            setCurrentDayData(res.data.Week[getDayName(date)]);
            setOriginalDayData(res.data.Week[getDayName(date)]);
        } catch (error) {
            // if a null TypeError then day has no food data, set to null; otherwise log other errors to the console
            error.message.includes('Cannot read properties of null') ? setCurrentDayData(null) : console.error(error);
        };
    };

    const handleDateScroll = newDate => {
        setSelectedDay(newDate);
        getDayData(user, newDate); // user is from useContext above
    };

    const handleLogFood = foodItem => {
        const updatedDayData = [...currentDayData];
        updatedDayData.push(foodItem);
        setCurrentDayData(updatedDayData);
    };

    const handleRemoveFood = foodItem => {
        const updatedDayData = [...currentDayData];
        const removalItemIndex = updatedDayData.indexOf(foodItem);
        updatedDayData.splice(removalItemIndex, 1);
        setSelectedDay(updatedDayData);
    };

    const submitLoggedFoods = async data => {
        const requestUrl = `/api/week/update`;
        const day = getDayName(selectedDay);
        const requestBody = { id: user.id, day: day, newData: data };
        const headers = xAuth(user.token)
        try {
            const res = await Axios.put(requestUrl, requestBody, headers);
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
            getDayData(user, selectedDay);
        };

    }, [user]);

    const h10Center = { height: '10%', ...center }

    return (
        <Stack sx={{ height: '90vh', width: '100vw' }}>
            <TitleContainer containerStyle={h10Center} />
            <DateScroller selectedDay={selectedDay} handleDateScroll={handleDateScroll} />
            <LogFoodButton containerStyle={h10Center} foodOptions={foodOptions} handleLogFood={handleLogFood} />
            <LogFoodDataDisplay currentDayData={currentDayData} originalDayData={originalDayData} />
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