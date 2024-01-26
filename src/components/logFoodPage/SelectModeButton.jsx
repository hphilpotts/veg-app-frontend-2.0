import React from 'react';

import { Stack, Button } from '@mui/material';

export const SelectModeButton = () => {
    return (
        <Stack direction={'row'} sx={{ justifyContent: 'space-around', marginTop: '2%' }} >
            <Button variant='outlined' >search mode</Button>
            <Button variant='outlined' >category mode</Button>
        </Stack>
    )
}