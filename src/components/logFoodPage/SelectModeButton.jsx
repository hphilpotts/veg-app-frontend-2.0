import React from 'react';

import { Stack, Button } from '@mui/material';

export const SelectModeButton = ({ inputMode, setInputMode }) => {

    const clickHandler = button => {
        if (button.id === 'search-mode') {
            setInputMode('search');
        } else {
            setInputMode('category');
        };
    };

    return (
        <Stack direction={'row'} sx={{ justifyContent: 'space-around', marginTop: '2%' }} >
            <Button
                onClick={e => clickHandler(e.target)}
                variant='outlined' color={inputMode === "search" ? 'primary' : 'grey'}
                size='small'
                disableRipple id='search-mode'
            >
                search
            </Button>
            <Button
                onClick={e => clickHandler(e.target)}
                variant='outlined' color={inputMode === 'category' ? 'primary' : 'grey'}
                size='small'
                disableRipple id='category mode'
            >
                category
            </Button>
        </Stack>
    );
};