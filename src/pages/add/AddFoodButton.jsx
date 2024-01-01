import React from 'react';

import Axios from 'axios';
import { xAuth } from '../../utils/axiosConfig';

import { v4 as uuid } from 'uuid';

import { Container, Button, Typography } from '@mui/material';
import { flexColumnCentered as center } from '../../utils/muiTheme';


export const AddFoodButton = ({ selectedFood, user }) => {

    const addFoodTo = async () => {
        // relevant Axios request
    }

    return (
        <Container sx={center}>
            <Button key={uuid()} variant='contained' color='primary'>
                <Typography variant='h6' onClick={handleClick} sx={{ textTransform: 'lowercase' }}>add food</Typography>
            </Button>
        </Container>
    )
}

