import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { v4 as uuid } from 'uuid'

import { FormControl } from '@mui/base'
import { Button, Container, FormLabel, MenuItem, Select, TextField, ButtonGroup } from '@mui/material'

import { UserContext } from '../App'

import { convertEmoji as emoji } from '../utils/emojiHelpers'
import { foodItemCategories, createFoodItem } from '../utils/foodHelpers'

import foodEmojis from '../assets/data/emojiTree.json'
import { Stack } from '@mui/system'

export const FoodAdd = () => {

  const user = useContext(UserContext)

  const navigateTo = useNavigate()

  useEffect(() => {
    if (!user.token) {
      navigateTo('/signin')
    }
  }, [])

  const emptyFormInput = { name: '', category: 'miscellaneous', icon: '0x2753' } // default to question mark emoji

  const [formInput, setFormInput] = useState(emptyFormInput)

  const [iconGroup, setIconGroup] = useState(formInput.category)

  const changeHandler = e => {
    const newInput = { ...formInput }
    newInput[e.target.name] = e.target.value
    if ((formInput.icon == '0x2753') || !formInput.name) {
      setIconGroup(newInput.category)
    }
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
      setIconGroup(emptyFormInput.category)
    } else {
      alert(res.response.data.message)
    }
  }

  const currentIconObject = foodEmojis[iconGroup]

  const iconOptions = Object.keys(currentIconObject).map(item => (
    <Button value={currentIconObject[item]} key={uuid()} name='icon' onClick={changeHandler} >{emoji(currentIconObject[item])}</Button>
  ))

  return (
    <Container>
      <FormControl>
        <Stack sx={{ maxWidth: '500px' }}>
          <FormLabel>Food Name</FormLabel>
          <TextField id='food-name-text-field' name='name' onChange={changeHandler} value={formInput.name}></TextField>
          <FormLabel>Category</FormLabel>
          <Select
            name='category'
            value={formInput.category}
            onChange={changeHandler}
          >
            {foodItemCategories.map(category => (
              <MenuItem value={category} key={uuid()}>{category}</MenuItem>
            ))}
          </Select>
          <FormLabel>Icon category:</FormLabel>
          <Select
            name='icon category'
            value={iconGroup}
            onChange={selectIconMenu}
          >
            {foodItemCategories.map((category, ix) => (
              <MenuItem value={category} key={category + ix + 'b'}>{category}</MenuItem>
            ))}
          </Select>

          <FormLabel id="demo-radio-buttons-group-label">Current icon:</FormLabel>
          <Container>
            <h1>{emoji(formInput.icon)}</h1>
          </Container>
          <p>Select a new icon:</p>
          <ButtonGroup
            disableElevation
            name="radio-buttons-group"
            size='large'
            sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}
            variant='text'
          >
            {iconOptions}
          </ButtonGroup>

          <Button type='submit' onClick={submitHandler}>submit</Button>
        </Stack>
      </FormControl>
    </Container>
  )
}
