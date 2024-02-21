import React from 'react';

import { Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export const FavouriteButton = ({ favourite }) => {

    const testClick = () => {
        console.log('click')
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <IconButton onClick={() => testClick()}>
                {favourite ? <StarIcon /> : <StarOutlineIcon />}
            </IconButton>
        </Box>
    )
}