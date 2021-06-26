import React, { useEffect} from 'react';
import {Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import { fetchIncompleteOrdersFromDB } from '../actions/orders';
import Order from '../components/Order'
import {order} from '../utilities/utilities'

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
        Orders: [order]
    }

    const orders = useSelector((state: RootState)=> state.Orders).filter(item => item.id !== '');

    useEffect(() => {
        dispatch(fetchIncompleteOrdersFromDB());
    }, [])

    return (
        <>
        <Typography align="center" variant="h5" gutterBottom>Kitchen Orders</Typography>
        <Grid className={classes.grid} spacing={1} container>
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
