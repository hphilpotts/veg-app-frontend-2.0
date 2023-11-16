import React, { useContext, useState } from 'react'
import { FormControl } from '@mui/base'
import { Button, Container, FormLabel, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'

import { UserContext } from '../App'

import { convertEmoji as emoji } from '../utils/emojiHelpers'
import { foodItemCategories, createFoodItem } from '../utils/foodHelpers'

import foodEmojis from '../assets/data/emojiTree.json'

export const FoodAdd = () => {

  const user = useContext(UserContext)

  const emptyFormInput = { name: '', category: 'miscellaneous', icon: '0x2753' } // default to question mark emoji

  const [formInput, setFormInput] = useState(emptyFormInput)

  const [iconGroup, setIconGroup] = useState(formInput.category)

  const changeHandler = e => {
    const newInput = { ...formInput }
    newInput[e.target.name] = e.target.value
    setIconGroup(newInput.category)
    setFormInput(newInput)
  }

  const selectIconMenu = e => {
    setIconGroup(e.target.value)
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

  const currentIconObject = foodEmojis[iconGroup]

  const iconOptions = Object.keys(currentIconObject).map(item => (
    <FormControlLabel value={item} key={item} control={<Radio />} label={emoji(currentIconObject[item])} />
  ))

  return (
    <Container>
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
        <FormLabel>Icon Category</FormLabel>
        <Select
          name='icon category'
          value={iconGroup}
          onChange={selectIconMenu}
        >
          {foodItemCategories.map((category, ix) => (
            <MenuItem value={category} key={category + ix + 'b'}>{category}</MenuItem>
          ))}
        </Select>

        <FormLabel id="demo-radio-buttons-group-label">Icon</FormLabel>
        <p>{iconGroup}</p>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          row
        >
          {iconOptions}
        </RadioGroup>

        <Button type='submit' onClick={submitHandler}>submit</Button>
      </FormControl>
    </Container>
  )
}
