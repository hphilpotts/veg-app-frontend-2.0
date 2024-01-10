// main imports
import React, { useContext, useState } from 'react';

// component imports
// mui
import { Stack, Container } from '@mui/material';
// other
import { DateScroller } from '../../components/DateScroller';
import { PageTitle } from '../../components/PageTitle';

// utils
import { flexColumnCentered as center } from '../../utils/muiTheme';

// other
import { UserContext } from '../../App';

export const AddFood = () => {

    const user = useContext(UserContext);

    const [activeDay, setActiveDay] = useState(new Date()); // inits as today

    return (
        <Stack sx={{ height: '90vh', width: '100vw' }}>
            <Container sx={{ height: '10%', ...center }}>
                <PageTitle titleText={'log new foods'} />
            </Container>
            <DateScroller activeDay={activeDay} setActiveDay={setActiveDay} />
            <Container sx={{ height: '10%', ...center }}>
                <p>this will be the add new button</p>
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