import Axios from 'axios';
import { xAuth } from './axiosConfig';

// axios requests

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

export const getWeekDocument = async (user, date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const requestUrl = `/api/week/find?user=${user.id}&date=${formattedDate}`;
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

export const evaluateWeekProgress = weekData => {
    if (!weekData?._id) return; // no weekData saved in state - exit by return
    evaluatePastWeeks(weekData.weekCommencing);
    const allFoodsArray = combineAllFoods(weekData);
    return new ProgressData(allFoodsArray);
};

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
}

const combineAllFoods = weekData => {
    const output = [];
    for (const property in weekData) {
        if (weekData[property].constructor === Array) { // only the day data properties are arrays, filters out timestamps, user properties etc.
            output.push(weekData[property]);
        };
    };
    return output.flat();
};

export const evaluatePastWeeks = startDate => {
    const pastWeekCommencings = getPreviousWeeks(startDate, 4);
    console.log(pastWeekCommencings);
};

const getPreviousWeeks = (date, numberWeeks) => { // todo - possibly move out to dateHelpers?
    const outputArr = [];
    const currentDate = new Date(date);
    for (let count = 0; count < numberWeeks; count++) {
        currentDate.setDate(currentDate.getDate() - 7);
        outputArr.push(new Date(currentDate));
    };
    return outputArr;
};