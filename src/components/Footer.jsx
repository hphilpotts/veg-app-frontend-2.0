import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FiberNewIcon from '@mui/icons-material/FiberNew';


export const Footer = () => {
    return (
        <Paper sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation showLabels position='static' color='primary' sx={{ top: 'auto', bottom: 0 }} >
                <BottomNavigationAction label="log food" icon={<RestaurantIcon />} component={RouterLink} to={'logFood/'} />
                <BottomNavigationAction label="progress" icon={<AssessmentIcon />} component={RouterLink} to={'progress/'} />
                <BottomNavigationAction label="create food" icon={<FiberNewIcon />} component={RouterLink} to={'createFood/'} />
            </BottomNavigation>
        </Paper >
    );
};