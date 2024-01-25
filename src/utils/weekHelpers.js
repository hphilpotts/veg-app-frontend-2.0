import Axios from 'axios';
import { xAuth } from './axiosConfig';

export const createNewWeekDocument = async (user, dateAsISOString) => {
    const requestBody = { user: user.id, date: dateAsISOString };
    try {
        const res = await Axios.post('/api/week/create', requestBody, xAuth(user.token));
        return res;
    } catch (error) {
        console.error(error);
        return error;
    };
};