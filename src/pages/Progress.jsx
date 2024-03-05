import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, CircularProgress, Typography } from '@mui/material';
import { PageTitle } from '../components/PageTitle';

import { flexColumnCentered as center } from '../utils/muiTheme';
import { evaluatePastWeeks, evaluateWeekProgress, getWeekDocument } from '../utils/weekHelpers';

import { UserContext } from '../App';


export const Progress = () => {

    const user = useContext(UserContext);

    const [weekData, setWeekData] = useState({});
    const [progressData, setProgressData] = useState(null);
    const [pastProgressData, setPastProgressData] = useState(null);

    const fetchWeekData = async (user, date) => {
        const res = await getWeekDocument(user, date);
        if (res) {
            setWeekData(res.data.Week);
            const evaluatedWeek = evaluateWeekProgress(res.data.Week);
            const pastWeeks = await evaluatePastWeeks(date, user);
            setProgressData(evaluatedWeek);
            setPastProgressData(pastWeeks);
        };
    };

    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user.loggedIn) {
            navigateTo('/');
        } else {
            fetchWeekData(user, new Date());
        }
    }, [user]);

    return (
        <>
            <PageTitle titleText={'progress'} />
            <ProgressDial data={progressData} />
        </>
    );

};

const ProgressDial = ({ data }) => {

    if (!data) return null;

    const target = data.uniqueFoodsCount + data.foodsRemaining;
    const progress = data.uniqueFoodsCount / target * 100;

    return (
        <>
            <Box sx={{ position: 'relative', display: 'inline-flex', marginTop: '5%' }}>
                <CircularProgress variant='determinate' value={progress} size={200} thickness={10} />
                <Box sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography>
                        {data.uniqueFoodsCount} / {target}
                    </Typography>
                </Box>

            </Box>
            <Box sx={center}>
                <Typography>
                    {data.uniqueFoodsCount} different foods eaten so far this week
                </Typography>
                <Typography>
                    {data.foodsRemaining} new foods left to go!
                </Typography>
            </Box>
        </>
    );

};