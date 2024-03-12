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
            <ProgressBarChart date={dayjs(weekData.weekCommencing)} progressData={currentWeekProgress} pastProgressData={pastWeeksProgress} />
        </>
    );

};

const ProgressDial = ({ data }) => { // todo - re-enable in Progress above when converted to dayjs

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

const ProgressBarChart = ({ date, progressData, pastProgressData }) => {

    const dates = getPreviousWeeks(date).concat(date);

    // skip format on invalid dates, then 
    // if no valid dates passed - e.g. if parent states have not yet been updated from DB - filter to result in empty array
    // ? could this be radically simplified through non-render if any of the props are undefined / not updated ... ?
    const displayDates = dates.map(date => !isNaN(date) ? date.format('DD-MM-YY') : null).filter(e => e != undefined);

    const totals = pastProgressData?.concat(progressData.uniqueFoodsCount);

    if (totals?.length && displayDates?.length) { // see above ? comment...
        return ( // todo - title etc - put in container?
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
    } else {
        return null;
    };

};