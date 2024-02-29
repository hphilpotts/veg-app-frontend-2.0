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

class ProgressData {

    constructor(allFoods) {
        this.allFoods = allFoods;
        this.uniqueFoods = [...new Set(allFoods)];
    }

    get allFoodsCount() { // ? undecided whether these are neccessary (although either way it's good pratice for me to use them)
        return this.allFoods.length; // ... or if simply accessing progressData.allFoods.length in Progress page is better
    }
    get uniqueFoodsCount() {
        return this.uniqueFoods.length;
    }

}

export const evaluateWeekProgress = weekData => {
    if (!weekData._id) return; // no weekData saved in state - exit by return
    const allFoodsArray = combineAllFoods(weekData);
    return new ProgressData(allFoodsArray);
};

const combineAllFoods = weekData => {
    const output = [];
    for (const property in weekData) {
        if (weekData[property].constructor === Array) { // only the day data properties are arrays, filters out timestamps, user properties etc.
            output.push(weekData[property]);
        };
    };
    return output.flat();
};