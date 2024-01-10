import React from 'react';

import { Container, Stack } from '@mui/material';

import { flexColumnCentered as centre } from '../utils/muiTheme';
import { incrementDate, decrementDate } from '../utils/dateHelpers';

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
                <button onClick={() => decrementHandler(activeDay)} >back</button>
                <p>{activeDay.toLocaleDateString()}</p>
                <button onClick={() => incrementHandler(activeDay)}>forward</button>
            </Stack>
        </Container>
    );
};