import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Box, Button, Container, IconButton, Link, Typography } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';

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
