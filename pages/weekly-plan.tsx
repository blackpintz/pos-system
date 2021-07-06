import DayPlan from "../components/DayPlan";
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    title: {
        marginTop: "1rem"
    }
}))

const WeeklyPlan = () => {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.title} align="center" variant="h5">Weekly Plan</Typography>
            <DayPlan day="MondayTodos" title="Monday" />
            <DayPlan day="TuesdayTodos" title="Tuesday" />
            <DayPlan day="WednesdayTodos" title="Wednesday" />
            <DayPlan day="ThursdayTodos" title="Thursday" />
            <DayPlan day="FridayTodos" title="Friday" />
        </>
    )
}


export default WeeklyPlan;