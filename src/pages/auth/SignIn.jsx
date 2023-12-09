import React, { useState } from 'react';

import { FormControl } from '@mui/base';
import { Button, Container, FormLabel, TextField } from '@mui/material';
import { PageTitle } from '../../components/PageTitle';

import { userSignInRequest } from '../../utils/authHelpers';

export const SignIn = ({ setUserFromSignIn }) => {

    const [formInput, setFormInput] = useState({
        email: '',
        password: ''
    });

    const formChangeHandler = target => {
        const newFormInput = { ...formInput };
        newFormInput[target.name] = target.value;
        setFormInput(newFormInput);
    };

    const submitHandler = async e => {
        e.preventDefault();
        const auth = await userSignInRequest(formInput);
        auth.attempt.successful ? setUserFromSignIn(auth.user) : signInFailed(auth.attempt.message);
    };

    const signInFailed = message => {
        alert(message);
    };

    return (
        <>
            <PageTitle titleText={'sign in'} />
            <FormControl>
                <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>email address</FormLabel>
                    <TextField name='email' type='email' onChange={e => formChangeHandler(e.target)}></TextField>
                    <FormLabel>password</FormLabel>
                    <TextField name='password' type='password' onChange={e => formChangeHandler(e.target)}></TextField>
                    <Button onClick={submitHandler}>Submit</Button>
                </Container>
            </FormControl>
        </>
    );
};
