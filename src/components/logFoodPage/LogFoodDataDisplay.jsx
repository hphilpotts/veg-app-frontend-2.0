import React from 'react';

import { v4 as uuid } from 'uuid';

import { Container, IconButton, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


export const LogFoodDataDisplay = ({ currentDayData, originalDayData, handleRemoveFood }) => {

    let foodItemsList;

    if (currentDayData) {
        foodItemsList = currentDayData.map((foodItem, index) => (
            <Container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} index={index} key={uuid()}>
                <Typography variant='body1' color={originalDayData.includes(foodItem) ? 'black': 'primary'} gutterBottom>
                    {foodItem}
                </Typography>
                <IconButton onClick={() => handleRemoveFood(index)}>
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