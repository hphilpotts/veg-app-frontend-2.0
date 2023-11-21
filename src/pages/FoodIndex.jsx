import React, { useState, useEffect, useContext } from 'react'

import Axios from 'axios'

import { UserContext } from '../App'
import { xAuth } from '../utils/axiosConfig'

export const FoodIndex = () => {

    const user = useContext(UserContext)

    const [allFoods, setAllFoods] = useState([])

    const category = 'berries'

    const getFoods = async () => {
        console.log(user.id)
        // await Axios.get(`/api/foodItem/favourites/${user.id}`)
        await Axios.get(`/api/foodItem/favourites/${user.id}`, xAuth(user.token))
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
                <li key={index}>{item.name}</li>
            ))}
        </div>
    )
}
