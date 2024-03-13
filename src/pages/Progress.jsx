import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Box, CircularProgress, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { PageTitle } from '../components/PageTitle';

import { green } from '@mui/material/colors';
import { flexColumnCentered as center } from '../utils/muiTheme';
import { evaluatePastWeeks, evaluateCurrentWeek, getWeekDocument } from '../utils/weekHelpers';
import { getPreviousWeeks } from '../utils/weekHelpers';

import { UserContext } from '../App';


export const Progress = () => {

    const user = useContext(UserContext);

    const [weekData, setWeekData] = useState({});
    const [currentWeekProgress, setCurrentWeekProgress] = useState(null);
    const [pastWeeksProgress, setPastWeeksProgress] = useState(null);

    const processWeekData = async (user, date) => {
        const res = await getWeekDocument(user, date);
        if (res) {
            setWeekData(res.data.Week);
            const evaluatedWeek = evaluateCurrentWeek(res.data.Week);
            const weekStartDate = dayjs(res.data.Week.weekCommencing)
            const pastWeeks = await evaluatePastWeeks(weekStartDate, user);
            setCurrentWeekProgress(evaluatedWeek);
            setPastWeeksProgress(pastWeeks);
        };
    };

    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user.loggedIn) {
            navigateTo('/');
        } else {
            processWeekData(user, dayjs());
        }
    }, [user]);

    return (
        <>
            <PageTitle titleText={'progress'} />
            <ProgressDial data={currentWeekProgress} />
            <ProgressBarChart date={dayjs(weekData.weekCommencing)} progressData={currentWeekProgress} pastWeekTotals={pastWeeksProgress} />
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

const ProgressBarChart = ({ date, progressData, pastWeekTotals }) => {

    if (date && progressData && pastWeekTotals) {

        const dates = getPreviousWeeks(date).concat(date);
        const displayDates = dates.map(date => date.format('DD-MM-YY'));
        const totals = pastWeekTotals.concat(progressData.uniqueFoodsCount);

        return (
            <BarChart
                xAxis={[{
                    scaleType: 'band',
                    data: displayDates,
                    tickLabelStyle: {
                        angle: 45,
                        textAnchor: 'start',
                        fontSize: '0.5rem'
                    }
                }]}
                yAxis={[{ label: 'weekly unique foods eaten' }]}
                series={[{ data: totals, color: green[800] }]}
                width={375}
                height={375}
            />
        );

    };

};