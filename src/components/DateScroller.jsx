import React, { useState } from 'react';
import dayjs from 'dayjs';

import { Container, Stack, IconButton, Typography } from '@mui/material';

import { flexColumnCentered as centre } from '../utils/muiTheme';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const DateScroller = ({ selectedDay, handleDateScroll }) => {

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const decrementHandler = date => {

        const previousDay = date.subtract(1, 'd');
        handleDateScroll(previousDay);
        setButtonDisabled(false);

    };

    const incrementHandler = date => {

        const nextDay = date.add(1, 'd');
        handleDateScroll(nextDay);

        const today = dayjs().startOf('date');

        if (today.isBefore(nextDay)) { // check if next day is in the future, disable button if so
            setButtonDisabled(true);
        };

    };
    
    const displayDate = selectedDay.format('DD/MM/YY');

    return (
        <Container sx={{ height: '10%', ...centre }}>
            <Stack direction={'row'}>
                <IconButton aria-label='previous day' color='primary' size='large' disableRipple onClick={() => decrementHandler(selectedDay)}>
                    <ArrowLeftIcon fontSize='large' />
                </IconButton>
                <Container sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h6'>{displayDate}</Typography>
                </Container>
                <IconButton id='increment-date-button' aria-label='next day' color='primary' size='large' disabled={buttonDisabled} disableRipple onClick={() => incrementHandler(selectedDay)}>
                    <ArrowRightIcon fontSize='large' />
                </IconButton>
            </Stack>
        </Container>
    );
};