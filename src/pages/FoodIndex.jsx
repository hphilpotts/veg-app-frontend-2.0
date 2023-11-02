import React, { useState, useEffect } from 'react'

import Axios from 'axios'

export const FoodIndex = () => {

    const [allFoods, setAllFoods] = useState([])

    const getFoods = async () => {
        await Axios.get('/api/foodItem/category/grains')
            .then(res => {
                setAllFoods(res.data.foodItems)
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        getFoods()
    }, [])

    return (
        <div>
            {allFoods.map((item, index) => (
                <li key={index}>{item.foodItemName}</li>
            ))}
        </div>
    )
}
