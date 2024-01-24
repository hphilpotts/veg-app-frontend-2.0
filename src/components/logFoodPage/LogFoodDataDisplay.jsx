import React from 'react';

import { v4 as uuid } from 'uuid';

import { Container, IconButton, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


export const LogFoodDataDisplay = ({ currentDayData, originalDayData }) => {

    let foodItemsList;

    if (currentDayData) {
        foodItemsList = currentDayData.map(foodItem => (
            <Container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} key={uuid()}>
                <Typography variant='body1' color={originalDayData.includes(foodItem) ? 'black': 'primary'} gutterBottom>
                    {foodItem}
                </Typography>
                <IconButton>
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </Container>
        ));
    };

    return (
        <Container sx={{ height: '70%', overflow: 'scroll' }}>
            {foodItemsList ? foodItemsList.reverse() : null}
        </Container>
    );
    
};