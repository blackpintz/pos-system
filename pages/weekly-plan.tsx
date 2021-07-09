import React, {useEffect} from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import DayPlan from "../components/DayPlan";
import { fetchDateFromDB } from '../actions/todos';


const useStyles = makeStyles(() => ({
    title: {
        marginTop: "1rem"
    }
}))

const WeeklyPlan = () => {
    const classes = useStyles();
    const dispatch =useDispatch();
    interface WeekDate {
        id: string | null,
        date: string
    }

    interface RootState {
        Todos: WeekDate
    }
    
    const startDate = useSelector((state: RootState) => state.Todos)

    useEffect(() => {
        dispatch(fetchDateFromDB())
    }, [])
    return (
        <>
            <Typography className={classes.title} align="center" variant="h5">Weekly Plan</Typography>
            <DayPlan startDate={moment(new Date(startDate.date)).format('LL')} day="MondayTodos" title="Monday" />
            <DayPlan startDate={moment(new Date(startDate.date)).add(1, 'days').format('LL')} day="TuesdayTodos" title="Tuesday" />
            <DayPlan startDate={moment(new Date(startDate.date)).add(2, 'days').format('LL')} day="WednesdayTodos" title="Wednesday" />
            <DayPlan startDate={moment(new Date(startDate.date)).add(3, 'days').format('LL')} day="ThursdayTodos" title="Thursday" />
            <DayPlan startDate={moment(new Date(startDate.date)).add(4, 'days').format('LL')} day="FridayTodos" title="Friday" />
        </>
    )
}


export default WeeklyPlan;