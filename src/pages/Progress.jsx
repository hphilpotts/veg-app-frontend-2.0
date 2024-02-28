import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';
import { xAuth } from '../utils/axiosConfig';

import { PageTitle } from '../components/PageTitle';

import { calculateWeekFoodCount } from '../utils/weekHelpers';

import { UserContext } from '../App';


export const Progress = () => {

    const user = useContext(UserContext);

    const [weekData, setWeekData] = useState({});

    const fetchWeekData = async (user, date) => {

        const formattedDate = date.toISOString().split('T')[0];
        const requestUrl = `/api/week/find?user=${user.id}&date=${formattedDate}`;

        try {
            const res = await Axios.get(requestUrl, xAuth(user.token));
            setWeekData(res.data.Week)
        } catch (error) {
            error.message.includes('Cannot read properties of null') ?
                console.warn('the week document you are fetching does not exist!') :
                console.error(error);
        };

    };

    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user.loggedIn) {
            navigateTo('/');
        } else {
            fetchWeekData(user, new Date());
        }
    }, [user]);

    return (
        <>
            <PageTitle titleText={'progress'} />
            <button onClick={() => calculateWeekFoodCount(weekData)}>test</button>
        </>
    );

};