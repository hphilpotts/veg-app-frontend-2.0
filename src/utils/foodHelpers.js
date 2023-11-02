import Axios from 'axios'

// const config = 

export const createFoodItem = formData => {
    Axios.post('/api/foodItem/add', formData, { headers: { 'x-auth-token': formData.token } })
        .then(res => {
            console.log(res);
        })
        .catch(err => { 
            console.error(err)
        })
}