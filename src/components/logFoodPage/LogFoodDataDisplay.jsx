import React from 'react';

import { v4 as uuid } from 'uuid';

import { Container, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export const LogFoodDataDisplay = ({ currentDayData, originalDayData }) => {

    let foodItemsList;

    if (currentDayData) {
        foodItemsList = currentDayData.map(foodItem => {
            if (originalDayData.includes(foodItem)) {
                return <Container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} key={uuid()}>
                            <p>{foodItem}</p>
                            <IconButton>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </Container>
            } else {
                // todo - move key when refactoring
                return <Container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} key={uuid()}> 
                            <p style={{ color: 'green' }} key={uuid()}>{foodItem}</p>
                            <IconButton>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </Container>
            }

        })
    }

    return (
        <Container sx={{ height: '70%', overflow: 'scroll' }}>
            {foodItemsList ? foodItemsList.reverse() : null}
        </Container>
    )
}