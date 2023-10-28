import React, { useState } from 'react'
import Axios from 'axios'
import { FormControl } from '@mui/base'
import { Button, Container, FormLabel, TextField } from '@mui/material'

export default function SignIn() {

    const [formInput, setFormInput] = useState({
        emailAddress: '',
        password: ''
    })

    const formChangeHandler = target => {
        const newFormInput = { ...formInput }
        newFormInput[target.name] = target.value
        setFormInput(newFormInput)
    }

    const submitHandler = e => {
        e.preventDefault()
        Axios.post('/api/auth/signin', formInput)
        .then(res => {
            console.log(res.data.token)
        })
        .catch(err => {
            console.error(error)
        })   
    }

    return (
        <FormControl>
            <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormLabel>email address</FormLabel>
                <TextField name='emailAddress' onChange={e => formChangeHandler(e.target)}></TextField>
                <FormLabel>password</FormLabel>
                <TextField name='password' onChange={e => formChangeHandler(e.target)}></TextField>
                <Button onClick={submitHandler}>Submit</Button>
            </Container>
        </FormControl>
    )
}
