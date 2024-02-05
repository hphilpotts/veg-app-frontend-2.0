import React from 'react';

import { Stack, ButtonGroup, Button } from '@mui/material';

export const SelectModeButton = ({ inputMode, setInputMode }) => {

    const clickHandler = button => {
        setInputMode(button.id);
    };

    return (
        <Stack direction={'row'} sx={{ justifyContent: 'space-around', marginTop: '2%' }} >
            <ButtonGroup variant='text'>
                <Button
                    onClick={e => clickHandler(e.target)}
                    color={inputMode === "search" ? 'primary' : 'grey'}
                    disableRipple
                    id='search'
                >
                    search
                </Button>
                <Button
                    onClick={e => clickHandler(e.target)}
                    color={inputMode === 'category' ? 'primary' : 'grey'}
                    disableRipple
                    id='category'
                >
                    category
                </Button>
                <Button
                    onClick={e => clickHandler(e.target)}
                    color={inputMode === 'favourites' ? 'primary' : 'grey'}
                    disableRipple
                    id='favourites'
                    disabled // * - re-enable when LogFoodFavouritesInput component finished
                >
                    favourites
                </Button>
            </ButtonGroup>
        </Stack>
    );

};