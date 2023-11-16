import React, { useContext, useState } from 'react'
import { FormControl } from '@mui/base'
import { Button, Container, FormLabel, MenuItem, Select, TextField } from '@mui/material'

import { UserContext } from '../App'

import { convertTo0x } from '../utils/emojiHelpers'
import { foodItemCategories, createFoodItem } from '../utils/foodHelpers'

export const FoodAdd = () => {

  const user = useContext(UserContext)

  const emptyFormInput = { name: '', category: 'miscellaneous', icon: 'U+2753' } // default to question mark emoji

  const [formInput, setFormInput] = useState(emptyFormInput)

  const changeHandler = e => {
    const newInput = { ...formInput }
    newInput[e.target.name] = e.target.value
    setFormInput(newInput)
  }

  const submitHandler = async () => {
    if (!user.id) throw new Error('You need to be signed in!')
    const res = await createFoodItem(Object.assign({ ...formInput }, { addedBy: user.id, token: user.token }))
    if (res.status === 201) {
      alert(res.data.message)
      setFormInput(emptyFormInput)
    } else {
      alert(res.response.data.message);
    }
  }

  const selectedEmoji = convertTo0x(formInput.icon) // test

  return (
    <Container>
      <p>{selectedEmoji}</p> {/* test */}
      
      <FormControl>
        <FormLabel>Food Name</FormLabel>
        <TextField id='food-name-text-field' name='name' onChange={changeHandler} value={formInput.name}></TextField>
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
