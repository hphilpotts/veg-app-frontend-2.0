import React from 'react';
import { v4 as uuid } from 'uuid';

import { Stack, Skeleton } from '@mui/material';

export const LoadingSkeleton = ({ count }) => {
    return (

        <Stack spacing={1}>
            {[...Array(count)].map(() => {
                <Skeleton key={uuid()} variant="rounded" width={210} height={60} />
            })}
        </Stack>

    )
}