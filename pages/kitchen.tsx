import React, { useEffect} from 'react';
import {Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import { fetchIncompleteOrdersFromDB } from '../actions/orders';
import { fetchTasksFromDB } from '../actions/todos';
import Order from '../components/Order';
import {order, Task} from '../utilities/utilities';
import TodoList from '../components/TodoList';

const useStyles = makeStyles(() => ({
    grid: {
        width: "96%",
        margin: "0 auto",
        textShadow: "rgba(255,255,255,0.5) 0px 0px 0.25rem",
    }
  }))



const Kitchen = () => {
    const classes = useStyles();
    const dispatch =useDispatch();
    interface RootState {
        Orders: [order],
        Todos: [Task]
    }

    const orders = useSelector((state: RootState)=> state.Orders).filter(item => item.id !== '');
    const tasks = useSelector((state: RootState)=> state.Todos).filter(item => item.id !== '');
    // const startTime = moment("6:19 PM", ["h:mm A"]).format("HH:mm")
    // const endTime = moment().format("HH:mm")
    // console.log(startTime)
    // console.log(endTime)
    // console.log(startTime > endTime)
    
    useEffect(() => {
        dispatch(fetchIncompleteOrdersFromDB());
        dispatch(fetchTasksFromDB(moment().format('dddd')))
    },[])

    return (
        <>
        <Typography align="center" variant="h5" gutterBottom>Kitchen Orders</Typography>
        <Grid className={classes.grid} spacing={1} container>
            <Grid item xs={12}>
                <TodoList tasks={tasks}/>
            </Grid>
            {orders && orders.map(order => (
                <Grid item xs={12} key={order.id} >
                    <Order order={order} />
                </Grid>
            ))}
        </Grid>
        </>
    )
}

export default Kitchen;
