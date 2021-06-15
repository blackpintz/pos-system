import React, { useEffect} from 'react';
import {Card, CardContent, CardActions, Grid, Typography, Button, Fade} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import { fetchIncompleteOrdersFromDB, updateDB } from '../actions/orders';

const useStyles = makeStyles(() => ({
    button : {
        position: "absolute", right: "1rem", marginBottom: "2rem",
        backgroundColor: "#000",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#76ff03",
            color: "#fff"
        }
    }
  }))

interface order {
    id: string | null,
    orders: any[],
    phoneNumber: string,
    total: number,
    created_at: string,
    completed: boolean,
    completed_time: string
}

const Kitchen = () => {
    const classes = useStyles();
    const dispatch =useDispatch();
    const handleUpdate = (id: string | null, orderToUpdate: order) => {
           const orderToDispatch = {
               ...orderToUpdate,
               completed: true
           }
           dispatch(updateDB(id, orderToDispatch))
      };

    interface RootState {
        Orders: [{
            id: string | null,
            orders: any[],
            phoneNumber: string,
            total: number,
            created_at: string,
            completed: boolean,
            completed_time: string
        }]
    }

    const orders = useSelector((state: RootState)=> state.Orders).filter(item => item.id !== '');

    useEffect(() => {
        dispatch(fetchIncompleteOrdersFromDB());
    }, [])
    var re = /^[0-9]$/g
    return (
        <>
        <Typography variant="h5" gutterBottom>Kitchen Orders</Typography>
        <Grid spacing={1} container>
        <Grid md={6} xs={12} item>
          <Typography variant="p" gutterBottom>here will go the kitch counter, the time since the next order that is up has been in the system.  Also count the number of orders</Typography>
        </Grid>
        <Grid md={6} xs={12} item>
            {orders && orders.map(order => (
                <Fade key={order.id} in={!order.completed} timeout={2000}>
                <Grid container spacing={1} >
                <Grid item md={12} xs={12} >
                    <Card>
                        <CardContent>
                        <h4>{order.phoneNumber} - Would be nice to know customer name too</h4>
                        <h2>{order.created_at} - regex to show the TIME</h2>
                        <ul>
                            {order.orders.map(item => (
                                <li key={item.id}>{item.quantity} {item.name}</li>
                            ))}
                        </ul>
                        <h4>Price of order: Kes.{order.total}</h4>
                        </CardContent>
                        <CardActions>
                            {!order.completed ? (
                            <Button
                            onClick={() => handleUpdate(order.id, order) }
                            variant="outlined"
                            className={classes.button}
                            color="primary">Mark as complete</Button>
                            ) : (
                                <Button
                                variant="contained"
                                className={classes.button}
                                startIcon={<DoneIcon />}>Order Completed</Button>
                            )}

                        </CardActions>
                    </Card>
                </Grid>
                </Grid>
                </Fade>
            ))}
        </Grid>
        </Grid>
        </>
    )
}

export default Kitchen;
