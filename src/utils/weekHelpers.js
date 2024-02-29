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

const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const evaluateWeekProgress = weekData => {

    if (!weekData._id) return; // no weekData saved in state - return

    const progressData = { 
        uniqueFoods: [],
        get uniqueFoodsCount() {
            return this.uniqueFoods.length;
        }
     };

    dayNames.forEach(day => populateUniqueFoods(progressData.uniqueFoods, weekData[day]));
    
    return progressData;
};

const populateUniqueFoods = (targetArray, dayArray) => {
    if (!dayArray.length) return; // dayArray passed in may be empty - prevents error mapping empty arr
    dayArray.map(foodItem => {
        if (!targetArray.includes(foodItem)) {
            targetArray.push(foodItem);
        };
    });
};