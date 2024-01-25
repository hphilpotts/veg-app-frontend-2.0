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