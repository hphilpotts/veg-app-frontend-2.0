import React, { useContext, useState } from 'react'
import { FormControl } from '@mui/base'
import { Button, Container, FormLabel, MenuItem, Select, TextField } from '@mui/material'

import { UserContext } from '../App'

import { createFoodItem } from '../utils/foodHelpers'

export const FoodAdd = () => {

  const foodItemCategories = ['green vegetables', 'salad vegetables', 'salad leaves', 'root vegetables', 'onions & friends', 'berries', 'orchard fruits', 'citrus fruits', 'exotic fruits', 'grains', 'nuts & seeds', 'miscellaneous'];

  const user = useContext(UserContext)

  const [formInput, setFormInput] = useState({
    name: '',
    category: 'miscellaneous'
  })

  const changeHandler = e => {
    const newInput = { ...formInput }
    newInput[e.target.name] = e.target.value
    setFormInput(newInput)
  }

  const submitHandler = e => {
    e.preventDefault();

    if (!user.id) throw new Error('uh oh')

    const newFoodItem = { ...formInput }
    newFoodItem.addedBy = user.id
    newFoodItem.token = user.token

    createFoodItem(newFoodItem)
  }

  return (
    <Container>
      <FormControl>
        <FormLabel>Food Name</FormLabel>
        <TextField name='name' onChange={changeHandler}>{formInput.addedBy}</TextField>
        <FormLabel>Category</FormLabel>
        <Select
          name='category'
          value={formInput.category}
          onChange={changeHandler}
        >
          {foodItemCategories.map((category, ix) => (
            <MenuItem value={category} key={category + ix}>{category}</MenuItem>
          ))}
        </Select>
        {/* <TextField name='category' onChange={changxeHandler}>{formInput.addedBy}</TextField> */}
        <Button type='submit' onClick={submitHandler}>submit</Button>
      </FormControl>
    </Container>
  )
}
