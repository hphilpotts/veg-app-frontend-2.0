import Axios from 'axios';
import { xAuth } from './axiosConfig';


// axios requests

export const createNewWeekDocument = async (user, date) => {
    // const formattedDate = date.toISOString().split('T')[0];
    const requestBody = { user: user.id, date: date.format('YYYY-MM-DD') };
    try {
        const res = await Axios.post('/api/week/create', requestBody, xAuth(user.token));
        return res;
    } catch (error) {
        console.error(error);
        return error;
    };
};

export const getWeekDocument = async (user, date) => {
    const requestUrl = `/api/week/find?user=${user.id}&date=${date.format('YYYY-MM-DD')}`;
    try {
        const res = await Axios.get(requestUrl, xAuth(user.token));
        return res;
    } catch (error) {
        error.message.includes('Cannot read properties of null') ?
            console.warn('the week document you are fetching does not exist!') :
            console.error(error);
    };
};


// weekly progress evaluation

class ProgressData {
    constructor(allFoods, target = 30) {
        this.allFoods = allFoods;
        this.uniqueFoods = [...new Set(allFoods)];
        this.foodsRemaining = target - this.uniqueFoods.length;
    }
    get allFoodsCount() { // ? undecided whether these are neccessary (although either way it's good pratice for me to use them)
        return this.allFoods.length; // ... or if simply accessing progressData.allFoods.length in Progress page is better
    }
    get uniqueFoodsCount() {
        return this.uniqueFoods.length;
    }
};

export const evaluateCurrentWeek = weekData => {
    if (!weekData?._id) return; // no weekData saved in state - exit by return
    const allFoodsArray = combineAllFoods(weekData);
    return new ProgressData(allFoodsArray);
};

export const evaluatePastWeeks = async (startDate, user) => {
    const pastWeekCommencings = getPreviousWeeks(startDate);
    let previousTotals = await Promise.all(pastWeekCommencings.map(async date => {
        try {
            const res = await getWeekDocument(user, date);
            const weeklyTally = combineAllFoods(res.data.Week).length;
            return weeklyTally;
        } catch (error) {
            return error;
        };
    }));
    return previousTotals;
};

export const getPreviousWeeks = (date, numberWeeks = 4) => {
    const output = [];
    const monday = date.startOf('week').add(1, 'd')
    for (let count = 1; count <= numberWeeks; count++) {
        output.unshift(monday.subtract(count, 'w'));
    };
    return output;
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