import React from 'react';

import { Typography } from '@mui/material';

export const PageTitle = ({ titleText }) => {
    return (
        <Typography variant='h4' margin={2}>{titleText}</Typography>
    );
};