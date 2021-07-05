import DayPlan from "../components/DayPlan";
import {Typography} from '@material-ui/core';

const WeeklyPlan = () => {
    return (
        <>
            <Typography align="center" variant="h5">Weekly Plan</Typography>
            <DayPlan />
        </>
    )
}


export default WeeklyPlan;