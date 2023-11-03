import Axios from 'axios'
import { xAuth } from './axiosConfig';

export const foodItemCategories = ['green vegetables', 'salad vegetables', 'salad leaves', 'root vegetables', 'onions & friends', 'berries', 'orchard fruits', 'citrus fruits', 'exotic fruits', 'grains', 'nuts & seeds', 'miscellaneous'];

export const createFoodItem = formData => {
    Axios.post('/api/foodItem/add', formData, xAuth(formData.token))
        .then(res => {
            console.log(res);
        })
        .catch(err => { 
            console.error(err)
        })
}