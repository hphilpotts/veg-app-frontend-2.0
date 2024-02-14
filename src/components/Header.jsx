import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
                    <Box flex={2}>
                        <HomeIcon />
                    </Box>
                    <DesktopHeaderIcon url={'logFood/'} iconText={'log food'} iconComponent={<RestaurantIcon />} />
                    <DesktopHeaderIcon url={'progress/'} iconText={'progress'} iconComponent={<AssessmentIcon />} />
                    <DesktopHeaderIcon url={'createFood/'} iconText={'create food'} iconComponent={<FiberNewIcon />} />
                    <Box flex={2} textAlign={'right'} sx={{ display: 'flex', justifyContent: 'end' }}>
                        {user.loggedIn ? <ActiveUserControls signOut={signOut} /> : <InactiveUserControls />}
                    </Box>
                </Container>
            </AppBar>
        </Box>
    );
};

const HomeIcon = () => {
    return (
        <Link to={'/'}>
            <IconButton color='secondary'>
                <CottageIcon></CottageIcon>
            </IconButton>
        </Link>
    );
};

const DesktopHeaderIcon = ({ url, iconText, iconComponent }) => { // todo - fix linking / change to buttons
    return (
        <Box flex={1} textAlign={'right'} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Link to={url} sx={{ margin: '0.5em' }}>
                <Typography variant='body2' color='white' sx={{ display: 'flex', alignItems: 'center' }}>
                    {iconText}
                    <div className='padding-div' style={{ width: '10px' }} />
                    {iconComponent}
                </Typography>
            </Link>
        </Box>
    );
};

const ActiveUserControls = ({ signOut }) => {
    return (
        <Button>
            <Typography color='white' variant='body2' sx={{ textTransform: 'lowercase' }} onClick={signOut}>logout</Typography>
        </Button>
    );
};

const InactiveUserControls = () => {
    return (
        <>
            <Link underline="none" color='inherit' variant='body2' sx={{ margin: '0.5em' }} component={RouterLink} to={'signin/'}>
                sign in
            </Link>
            <Link underline="none" color='inherit' variant='body2' sx={{ margin: '0.5em' }} component={RouterLink} to={'signup/'}>
                sign up
            </Link>
        </>
    );
};
