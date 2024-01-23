import React, { useState } from 'react';

import { Container, Stack, IconButton, Typography } from '@mui/material';

import { flexColumnCentered as centre } from '../utils/muiTheme';
import { incrementDate, decrementDate } from '../utils/dateHelpers';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const DateScroller = ({ selectedDay, handleDateScroll }) => {

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const decrementHandler = date => {

        const previousDay = decrementDate(date);
        handleDateScroll(previousDay);
        setButtonDisabled(false);

    };

    const incrementHandler = date => {

        const nextDay = incrementDate(date);
        handleDateScroll(nextDay);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (today.getTime() <= nextDay.getTime()) { // check if next day is in the future, disable button if so
            setButtonDisabled(true);
        };

    };

    return (
        <Container sx={{ height: '10%', ...centre }}>
            <Stack direction={'row'}>
                <IconButton aria-label='previous day' color='primary' size='large' disableRipple onClick={() => decrementHandler(selectedDay)}>
                    <ArrowLeftIcon fontSize='large' />
                </IconButton>
                <Container sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h5'>{selectedDay.toLocaleDateString()}</Typography>
                </Container>
                <IconButton id='increment-date-button' aria-label='next day' color='primary' size='large' disabled={buttonDisabled} disableRipple onClick={() => incrementHandler(selectedDay)}>
                    <ArrowRightIcon fontSize='large' />
                </IconButton>
            </Stack>
        </Container>
    );
};