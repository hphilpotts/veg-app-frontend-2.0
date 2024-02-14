import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { AppBar, Box, Button, Container, IconButton, Link, Typography } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FiberNewIcon from '@mui/icons-material/FiberNew';

import { UserContext } from '../App';

export const Header = ({ signOut }) => {

    const user = useContext(UserContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Container maxWidth='xl' sx={{ display: 'flex' }}>
                    <HomeIcon />
                    <DesktopHeaderIcon url={'logFood/'} iconText={'log food'} iconComponent={<RestaurantIcon />} />
                    <DesktopHeaderIcon url={'progress/'} iconText={'progress'} iconComponent={<AssessmentIcon />} />
                    <DesktopHeaderIcon url={'createFood/'} iconText={'create food'} iconComponent={<FiberNewIcon />} />
                    {user.loggedIn ? <ActiveUserControls signOut={signOut} /> : <InactiveUserControls />}
                </Container>
            </AppBar>
        </Box >
    );
};

const HomeIcon = () => {
    return (
        <Box flex={2}>
            <Link to={'/'}>
                <IconButton color='secondary'>
                    <CottageIcon></CottageIcon>
                </IconButton>
            </Link>
        </Box>
    );
};

const DesktopHeaderIcon = ({ url, iconText, iconComponent }) => {

    const navigateTo = useNavigate();

    const navigateOnClick = url => {
        navigateTo(url);
    };

    return (
        <Box onClick={() => navigateOnClick(url)} flex={1} textAlign={'right'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ display: 'flex', cursor: 'pointer', marginRight: '5px' }}>
                {iconText}
            </Typography>
            <Typography variant='body2' sx={{ display: 'flex', cursor: 'pointer', marginLeft: '5px' }}>
                {iconComponent}
            </Typography>
        </Box>
    );

};

const ActiveUserControls = ({ signOut }) => {
    return (
        <Box flex={2} textAlign={'right'} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button>
                <Typography color='white' variant='body2' sx={{ textTransform: 'lowercase' }} onClick={signOut}>logout</Typography>
            </Button>
        </Box>
    );
};

const InactiveUserControls = () => {
    return (
        <Box flex={2} textAlign={'right'} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Link underline="none" color='inherit' variant='body2' sx={{ margin: '0.5em' }} component={RouterLink} to={'signin/'}>
                sign in
            </Link>
            <Link underline="none" color='inherit' variant='body2' sx={{ margin: '0.5em' }} component={RouterLink} to={'signup/'}>
                sign up
            </Link>
        </Box>
    );
};
