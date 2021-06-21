import React, {useEffect} from 'react';
import {Typography, Grid, Card, CardContent, Chip, CardActions} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {order, checkQuantity} from '../utilities/utilities'
import {fetchPaidOrdersFromDB} from '../actions/orders'

const useStyles = makeStyles(() => ({
    grid: {
        width: "96%",
        margin: "0 auto"
    },

    complete: {
        backgroundColor: "#76ff03",
        color: "#fff"
    },

    incomplete: {
        backgroundColor: "#d50000",
        color: "#fff"
    }
}))

const Paid = () => {
    const classes = useStyles();
    const dispatch =useDispatch();
    interface RootState {
        Orders: [order]
    }

    const orders = useSelector((state: RootState)=> state.Orders).filter(item => item.id !== '');


    useEffect(() => {
        dispatch(fetchPaidOrdersFromDB())
    }, [])
    return (
        <>
            <Typography align="center" variant="h5" gutterBottom> Paid orders</Typography>
            <Grid className={classes.grid} spacing={1} container>
                {orders && orders.map(order => (
                    <Grid item key={order.id} xs={12}>
                        <Card>
                            <CardContent>
                                <h5>{order.phoneNumber}</h5>
                                <ul>
                                    {order.orders.map(item => (
                                        <li key={item.id}>{checkQuantity(item.quantity, item.name)}</li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Chip 
                                label={order.completed ? "Completed" : "Not Completed"}
                                className= {order.completed ? classes.complete : classes.incomplete}/>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Paid;