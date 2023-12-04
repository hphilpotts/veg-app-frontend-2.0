import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Box, Container, IconButton, Link, Typography } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';

import { UserContext } from '../App';

export const Header = ({ signOut }) => {

    const user = useContext(UserContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Container maxWidth='xl' sx={{ display: 'flex' }}>
                    <Box flex={2}>
                        <Link to={'/'}>
                            <IconButton color='secondary'>
                                <CottageIcon></CottageIcon>
                            </IconButton>
                        </Link>
                    </Box>
                    <Box flex={2} textAlign={'right'} sx={{ display: 'flex', justifyContent: 'end' }}>
                        {user.loggedIn ?
                            <>
                                <Typography color='inherit' variant='body2' sx={{ margin: '0.5em' }} onClick={signOut}>logout</Typography>
                            </> :
                            <>
                                <Link underline="none" color='inherit' variant='body2' sx={{ margin: '0.5em' }} component={RouterLink} to={'signin/'}>
                                    sign in
                                </Link>
                                <Link underline="none" color='inherit' variant='body2' sx={{ margin: '0.5em' }} component={RouterLink} to={'signup/'}>
                                    sign up
                                </Link>
                            </>
                        }
                    </Box>
                </Container>
            </AppBar>
        </Box>
    );
};