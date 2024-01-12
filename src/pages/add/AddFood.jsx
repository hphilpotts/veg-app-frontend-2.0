// main imports
import React, { useContext, useState, useEffect } from 'react';

// component imports
// mui
import { Stack, Container } from '@mui/material';
// other
import { DateScroller } from '../../components/DateScroller';
import { AddFoodButton } from '../../components/AddFoodButton';
import { PageTitle } from '../../components/PageTitle';

// utils
import { flexColumnCentered as center } from '../../utils/muiTheme';
import { getFoods } from '../../utils/foodHelpers';

// other
import { UserContext } from '../../App';

export const AddFood = () => {

    const user = useContext(UserContext);

    const [activeDay, setActiveDay] = useState(new Date()); // inits as today

    const [foodsData, setFoodsData] = useState(null);

    const getFoodsData = async user => {
        const allFoods = []
        const res = await getFoods(user, null);
        const categoryKeys = Object.keys(res.Foods).filter(key => key[0] != '_' && key != 'user')
        categoryKeys.forEach(key => allFoods.push(res.Foods[key]))
        // console.log(allFoods.flat());
        setFoodsData(allFoods.flat());
    }

    useEffect(() => {
        if (!user.loggedIn) {
            // navigateTo('/');
            null
        } else {
            getFoodsData(user);
        };
    }, [user]);

    return (
        <Stack sx={{ height: '90vh', width: '100vw' }}>
            <TitleContainer />
            <DateScroller activeDay={activeDay} setActiveDay={setActiveDay} />
            <Container sx={{ height: '10%', ...center }}>
                <AddFoodButton foods={foodsData} />
            </Container>
            <Container sx={{ height: '70%', overflow: 'scroll' }}>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
                <p>this will be the already loaded data</p>
            </Container>
        </Stack>
    )

}

const TitleContainer = () => {
    return (
        <Container sx={{ height: '10%', ...center }}>
            <PageTitle titleText={'log new foods'} />
        </Container>
    )
}