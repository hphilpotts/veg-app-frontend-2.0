import React, { useState } from 'react';

import { Stack, Button } from '@mui/material';

export const SelectModeButton = ({ searchMode, setSearchMode }) => {

    const clickHandler = button => {
        if (button.id === 'search-mode') {
            setSearchMode(true);
        } else {
            setSearchMode(false);
        };
    };

    return (
        <Stack direction={'row'} sx={{ justifyContent: 'space-around', marginTop: '2%' }} >
            <Button onClick={e => clickHandler(e.target)} variant={searchMode ? 'contained' : 'outlined'} disableRipple id='search-mode'>search mode</Button>
            <Button onClick={e => clickHandler(e.target)} variant={searchMode ? 'outlined' : 'contained'} disableRipple id='category mode'>category mode</Button>
        </Stack>
    );
};