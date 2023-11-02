import React, { useState } from 'react'
import { FormControl } from '@mui/base'
import { Button, Container, FormLabel, TextField } from '@mui/material'

import { userSignupAttempt, userSignInRequest } from '../utils/authHelpers'

export const SignUp = ({ signIn }) => {

    const [formInput, setFormInput] = useState({
        emailAddress: '',
        userName: '',
        password: '',
    })

    const formChangeHandler = target => {
        const newFormInput = { ...formInput }
        newFormInput[target.name] = target.value
        setFormInput(newFormInput)
    }

    const submitHandler = async e => {
        e.preventDefault()
        const signup = await userSignupAttempt(formInput)
        if (signup.successful) {
            const user = await userSignInRequest(formInput)
            signIn(user)
        } else {
            signUpFailed(signup.message)
        }
    }

    const signUpFailed = message => {
        alert(message)
    }

    return (
        <FormControl>
            <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormLabel>email address</FormLabel>
                <TextField name='emailAddress' onChange={e => formChangeHandler(e.target)}></TextField>
                <FormLabel>userName</FormLabel>
                <TextField name='userName' onChange={e => formChangeHandler(e.target)}></TextField>
                <FormLabel>password</FormLabel>
                <TextField name='password' onChange={e => formChangeHandler(e.target)}></TextField>
                <Button onClick={submitHandler}>Submit</Button>
            </Container>
        </FormControl>
    )
}
