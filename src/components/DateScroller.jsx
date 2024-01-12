import React from 'react';

import { Container, Stack, IconButton, Typography } from '@mui/material';

import { flexColumnCentered as centre } from '../utils/muiTheme';
import { incrementDate, decrementDate } from '../utils/dateHelpers';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const DateScroller = ({ activeDay, setActiveDay }) => {

    const decrementHandler = date => {
        const previousDay = decrementDate(date);
        setActiveDay(previousDay);
    };

    const incrementHandler = date => {
        const nextDay = incrementDate(date);
        setActiveDay(nextDay);
    };

    return (
        <Container sx={{ height: '10%', ...centre }}>
            <Stack direction={'row'}>
                <IconButton aria-label='previous day' color='primary' size='large' disableRipple onClick={() => decrementHandler(activeDay)}>
                    <ArrowLeftIcon fontSize='large' />
                </IconButton>
                <Container sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h5'>{activeDay.toLocaleDateString()}</Typography>
                </Container>
                <IconButton aria-label='next day' color='primary' size='large' disableRipple onClick={() => incrementHandler(activeDay)}>
                    <ArrowRightIcon fontSize='large' />
                </IconButton>
            </Stack>
        </Container>
    );
};