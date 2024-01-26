import React from 'react';

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
            <Button
                onClick={e => clickHandler(e.target)}
                variant='outlined' color={searchMode ? 'primary' : 'grey'}
                size='small'
                disableRipple id='search-mode'
            >
                search
            </Button>
            <Button
                onClick={e => clickHandler(e.target)}
                variant='outlined' color={!searchMode ? 'primary' : 'grey'}
                size='small'
                disableRipple id='category mode'
            >
                category
            </Button>
        </Stack>
    );
};