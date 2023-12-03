import Axios from 'axios'
import { xAuth } from './axiosConfig';

export const foodItemCategories = ['green vegetables', 'salad vegetables', 'salad leaves', 'root vegetables', 'onions & friends', 'berries', 'orchard fruits', 'citrus fruits', 'exotic fruits', 'grains', 'nuts & seeds', 'miscellaneous'];

export const createFoodItem = async formData => {
    console.log(formData)
    console.log(formData.icon)
    console.log(typeof formData.icon)
    try {
        const res = await Axios.post('/api/foodItem/add', formData, xAuth(formData.token))
        return res
    } catch (error) {
        return error
    }
}

export const createNewFoodDocument = async user => {
    const requestBody = { user: user.id };
    try {
        return await Axios.post('/api/foods/create', requestBody, xAuth(user.token));
    } catch (error) {
        return error;
    };
};