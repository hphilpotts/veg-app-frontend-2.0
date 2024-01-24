import React from 'react';

import { Container } from '@mui/material';

export const LogFoodDataDisplay = ({ foodItemsList }) => {
    return (
        <Container sx={{ height: '70%', overflow: 'scroll' }}>
            {foodItemsList ? foodItemsList.reverse() : null}
        </Container>
    )
}