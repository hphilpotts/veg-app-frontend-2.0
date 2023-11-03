import React, { useContext, useState } from 'react'
import { FormControl } from '@mui/base'
import { Button, Container, FormLabel, MenuItem, Select, TextField } from '@mui/material'

import { UserContext } from '../App'

import { foodItemCategories, createFoodItem } from '../utils/foodHelpers'

export const FoodAdd = () => {

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
    createFoodItem(Object.assign({ ...formInput }, { addedBy: user.id, token: user.token }))
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
        <Button type='submit' onClick={submitHandler}>submit</Button>
      </FormControl>
    </Container>
  )
}
