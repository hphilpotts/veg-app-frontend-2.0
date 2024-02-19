import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';
import { xAuth } from '../utils/axiosConfig';

import { Stack, Container } from '@mui/material';

import { DateScroller } from '../components/DateScroller';
import { LogFoodInputContainer } from '../components/logFoodPage/LogFoodInputs';
import { LogFoodDataDisplay } from '../components/logFoodPage/LogFoodDataDisplay';
import { PageTitle } from '../components/PageTitle';
import { SelectModeButton } from '../components/logFoodPage/SelectModeButton';

import { flexColumnCentered as center } from '../utils/muiTheme';
import { getFoods, getFavouritesRequest } from '../utils/foodHelpers';
import { getDayName } from '../utils/dateHelpers';
import { createNewWeekDocument } from '../utils/weekHelpers';

import { UserContext } from '../App';

export const LogFood = () => {

    const user = useContext(UserContext);

    const [selectedDay, setSelectedDay] = useState(new Date()); // inits as today
    const [foodOptions, setFoodOptions] = useState(null);
    const [favourites, setFavourites] = useState([]);
    const [week, setWeek] = useState({ id: '', currentDayData: [], originalDayData: [] });
    const [inputMode, setInputMode] = useState('search');

    const getFavourites = async user => {
        const res = await getFavouritesRequest(user);
        setFavourites(res);
    };

    const getAllFoodOptions = async user => {
        const foodsCollection = await getFoods(user, null);
        setFoodOptionsHandler(inputMode, foodsCollection.Foods);
    };

    const setFoodOptionsHandler = (mode, responseData) => {
        const categoryKeys = Object.keys(responseData).filter(key => key[0] != '_' && key != 'user'); // filter out non-category keys from GET res data
        if (mode === 'search') {
            const output = [];
            categoryKeys.forEach(categoryKey => output.push(responseData[categoryKey]));
            setFoodOptions(output.flat());
        } else if (mode === 'category') {
            const output = {};
            categoryKeys.forEach(categoryKey => output[categoryKey] = responseData[categoryKey]);
            setFoodOptions(output);
        } else {
            setFoodOptions(favourites);
        };
    };

    const getDayData = async (user, date) => {

        const formattedDate = date.toISOString().split('T')[0];
        const requestUrl = `/api/week/find?user=${user.id}&date=${formattedDate}`;

        try {
            const res = await Axios.get(requestUrl, xAuth(user.token));
            const dayData = res.data.Week[getDayName(date)];
            setWeek({ id: res.data.Week._id, currentDayData: [...dayData], originalDayData: [...dayData] });
        } catch (error) {
            // if a null TypeError week document does not exist, create new week and retry; otherwise log other errors to the console
            error.message.includes('Cannot read properties of null') ? handleNullWeek(user, date) : console.error(error);
        };

    };

    const handleNullWeek = async (user, date) => {
        const res = await createNewWeekDocument(user, date);
        if (res.status === 201) {
            getDayData(user, date);
        } else {
            console.error("error handling null week");
        };
    };

    const handleDateScroll = newDate => {
        setSelectedDay(newDate);
        getDayData(user, newDate);
    };

    const handleLogFood = foodItem => {
        if (foodItem.length) {
            const newWeek = { ...week };
            newWeek.currentDayData.push(foodItem);
            setWeek(newWeek);
            submitLoggedFoods(newWeek.currentDayData);
        };
    };

    const handleRemoveFood = foodItemIndex => {
        const newWeek = { ...week };
        newWeek.currentDayData.splice(foodItemIndex, 1);
        setWeek(newWeek);
        submitLoggedFoods(newWeek.currentDayData);
    };

    const submitLoggedFoods = async data => {
        const day = getDayName(selectedDay);
        const requestBody = { id: week.id, day: day, newData: data, user: user.id };
        try {
            const res = await Axios.put(`/api/week/update`, requestBody, xAuth(user.token));
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
            getFavourites(user);
            getAllFoodOptions(user);
            getDayData(user, selectedDay);
        };
    }, [user, inputMode]);


    return (
        <Stack sx={{ height: '90vh', width: '100vw', maxWidth: 600 }}>
            <TitleContainer containerStyle={{ height: '10%', ...center }} />
            <DateScroller selectedDay={selectedDay} handleDateScroll={handleDateScroll} />
            <LogFoodInputContainer inputMode={inputMode} foodOptions={foodOptions} favourites={favourites} handleLogFood={handleLogFood} />
            <SelectModeButton inputMode={inputMode} setInputMode={setInputMode} />
            <LogFoodDataDisplay currentDayData={week.currentDayData} originalDayData={week.originalDayData} handleRemoveFood={handleRemoveFood} />
        </Stack>
    );

};

const TitleContainer = ({ containerStyle }) => {
    return (
        <Container sx={containerStyle}>
            <PageTitle titleText={'log new foods'} />
        </Container>
    );
};