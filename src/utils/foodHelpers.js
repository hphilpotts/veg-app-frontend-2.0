import Axios from 'axios';
import { xAuth } from './axiosConfig';

export const foodItemCategoryKeys = [
    'greenVegetables',
    'saladVegetables',
    'saladLeaves',
    'rootVegetables',
    'onionsAndFriends',
    'legumesAndPulses',
    'nutsAndSeeds',
    'grainsAndCereals',
    'orchardFruits',
    'citrusFruits',
    'exoticFruits',
    'berries',
    'otherFruits',
    'herbs',
    'spices',
    'sweeteners',
    'oils',
    'miscellaneous'
];

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