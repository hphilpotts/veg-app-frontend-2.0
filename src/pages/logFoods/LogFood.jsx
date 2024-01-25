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
import { createNewWeekDocument } from '../../utils/weekHelpers';

import { UserContext } from '../../App';

export const LogFood = () => {

    const user = useContext(UserContext);

    const [selectedDay, setSelectedDay] = useState(new Date()); // inits as today

    const [foodOptions, setFoodOptions] = useState(null);

    const [currentDayData, setCurrentDayData] = useState([]);
    const [originalDayData, setOriginalDayData] = useState([]);
    const [weekId, setWeekId] = useState('');


    const getAllFoods = async user => {

        const allFoodsOutput = [];
        const foodsCollection = await getFoods(user, null);

        // filter non-food keys from returned object
        const categoryKeys = Object.keys(foodsCollection.Foods).filter(key => key[0] != '_' && key != 'user');
        categoryKeys.forEach(categoryKey => allFoodsOutput.push(foodsCollection.Foods[categoryKey]));
        setFoodOptions(allFoodsOutput.flat());

    };


    const getDayData = async (user, date) => {

        const formattedDate = date.toISOString().split('T')[0];
        const requestUrl = `/api/week/find?user=${user.id}&date=${formattedDate}`;

        try {
            const res = await Axios.get(requestUrl, xAuth(user.token));
            // todo - combine into single state?
            setCurrentDayData(res.data.Week[getDayName(date)]);
            setOriginalDayData(res.data.Week[getDayName(date)]);
            setWeekId(res.data.Week._id);
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
        const updatedDayData = currentDayData ? [...currentDayData] : [];
        updatedDayData.push(foodItem);
        setCurrentDayData(updatedDayData);
    };

    const handleRemoveFood = foodItemIndex => {
        const updatedDayData = [...currentDayData];
        updatedDayData.splice(foodItemIndex, 1);
        setCurrentDayData(updatedDayData);
    };

    const submitLoggedFoods = async data => {
        const day = getDayName(selectedDay);
        const requestBody = { id: weekId, day: day, newData: data };
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
            getAllFoods(user);
            getDayData(user, selectedDay);
        };
    }, [user]);


    // TODO - remove button element (testing Axios req)
    // ? automate saving when scrolling to next day or leaving page?
    // ? or add a 'save' button? - perhaps floating in mobile and fixed on wider screens?
    return (
        <Stack sx={{ height: '90vh', width: '100vw', maxWidth: 600 }}>
            <TitleContainer containerStyle={{ height: '10%', ...center }} />
            <DateScroller selectedDay={selectedDay} handleDateScroll={handleDateScroll} />
            <LogFoodButton containerStyle={{ height: '10%', ...center }} foodOptions={foodOptions} handleLogFood={handleLogFood} />
            <button onClick={() => submitLoggedFoods(currentDayData)}>save</button>
            <LogFoodDataDisplay currentDayData={currentDayData} originalDayData={originalDayData} handleRemoveFood={handleRemoveFood} />
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