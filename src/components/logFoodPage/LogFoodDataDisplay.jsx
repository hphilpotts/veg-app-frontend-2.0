import React from 'react';

import { v4 as uuid } from 'uuid';

import { Container, IconButton, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { FavouriteButton } from '../FavouriteButton';

export const LogFoodDataDisplay = ({ currentDayData, originalDayData, handleRemoveFood }) => {

    let foodItemsList;

    if (currentDayData) {
        // TODO - add dialogue to confirm deletion of original items
        foodItemsList = currentDayData.map((foodItem, index) => (
            <Container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} index={index} key={uuid()}>
                <Container sx={{ width: '50%', display: 'flex', alignItems: 'flex-end'}}>
                    <Typography variant='body1' color={ifExistingEntry(originalDayData, foodItem, index) ? 'black' : 'primary'} gutterBottom>
                        {foodItem}
                    </Typography>
                </Container>
                <Container sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '50%' }}>
                    <FavouriteButton />
                    <IconButton onClick={() => handleRemoveFood(index)}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </Container>

            </Container>
        ));
    };

    return (
        <Container sx={{ height: '70%', overflow: 'scroll', marginTop: { xs: '5%', md: '2%', xl: '1%' } }}>
            {foodItemsList ? foodItemsList.reverse() : null}
        </Container>
    );

};

const ifExistingEntry = (originalData, foodItem, index) => {
    if (!originalData.includes(foodItem)) {
        return false;
    }
    if (index >= originalData.length) {
        return false;
    }
    return true;
};