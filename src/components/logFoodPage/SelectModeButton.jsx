import React from 'react';

import { Stack, Button } from '@mui/material';

export const SelectModeButton = ({ inputMode, setInputMode }) => {

    const clickHandler = button => {
        setInputMode(button.id);
    };

    return (
        <Stack direction={'row'} sx={{ justifyContent: 'space-around', marginTop: '2%' }} >
            <Button
                onClick={e => clickHandler(e.target)}
                variant='outlined' color={inputMode === "search" ? 'primary' : 'grey'}
                size='small'
                disableRipple 
                id='search'
            >
                search
            </Button>
            <Button
                onClick={e => clickHandler(e.target)}
                variant='outlined' color={inputMode === 'category' ? 'primary' : 'grey'}
                size='small'
                disableRipple 
                id='category'
            >
                category
            </Button>
            <Button
                onClick={e => clickHandler(e.target)}
                variant='outlined' color={inputMode === 'favourites' ? 'primary' : 'grey'}
                size='small'
                disableRipple
                id='favourites'
            >
                favourites
            </Button>
        </Stack>
    );
};