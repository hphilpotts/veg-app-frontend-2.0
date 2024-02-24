import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageTitle } from '../components/PageTitle';

import { UserContext } from '../App';

export const CreateFood = () => {

    const user = useContext(UserContext);

    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user.loggedIn) {
            navigateTo('/');
        };
    }, [user]);

    return (
        <PageTitle titleText={'create food'} />
    );
};