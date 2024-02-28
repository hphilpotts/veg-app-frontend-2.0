import Axios from 'axios';
import { xAuth } from './axiosConfig';

export const createNewWeekDocument = async (user, date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const requestBody = { user: user.id, date: formattedDate };
    try {
        const res = await Axios.post('/api/week/create', requestBody, xAuth(user.token));
        return res;
    } catch (error) {
        console.error(error);
        return error;
    };
};

export const calculateWeekFoodCount = weekData => {

    if (!weekData._id) return; // no weekData saved in state - return 

    const uniqueWeekFoods = [];
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].forEach(day => {
        if (weekData[day]) {
            weekData[day].map(foodItem => {
                if (!uniqueWeekFoods.includes(foodItem)) {
                    uniqueWeekFoods.push(foodItem);
                };
            });
        };
    });
    console.log(uniqueWeekFoods);
};