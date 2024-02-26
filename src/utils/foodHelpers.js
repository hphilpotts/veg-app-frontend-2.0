import Axios from 'axios';
import { xAuth } from './axiosConfig';

export const createNewFoodDocument = async user => {
    const requestBody = { user: user.id };
    try {
        return await Axios.post('/api/foods/create', requestBody, xAuth(user.token));
    } catch (error) {
        console.error(error);
        return error;
    };
};

export const getFoods = async (user, category) => {

    let url = `/api/foods?user=${user.id}`;
    if (category) {
        url += `&optionalCategoryFilter=${category}`;
    };

    try {
        const res = await Axios.get(url, xAuth(user.token));
        return res.data;
    } catch (error) {
        console.error(error);
        return error;
    };

};

export const updateFoodsDocumentRequest = async (user, requestBody) => {
    try {
        const res = await Axios.post('/api/foods/update', requestBody, xAuth(user.token));
        return res;
    } catch (error) {
        console.error(error);
        return error;
    };
};

export const getFavouritesRequest = async user => {
    const url = `/api/user/favourites?userId=${user.id}`
    try {
        const res = await Axios.get(url); // todo - add xAuth(user.token) to get config (2nd argument) when protected on BE
        return res.data.userFavourites;
    } catch (error) {
        console.error(error);
        return error;
    };
};

export const updateFavouritesRequest = async (user, foodItem) => {
    const requestBody = { id: user.id, foodItem: foodItem };
    try {
        const res = await Axios.put('/api/user/favourites/update', requestBody, xAuth(user.token));
        return res.status;
    } catch (error) {
        console.error(error);
        return error;
    };
};