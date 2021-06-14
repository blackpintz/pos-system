import React, { useEffect} from 'react';
import {Card, CardContent, CardActions, Grid, Typography, Button, Fade} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import { fetchIncompleteOrdersFromDB, updateDB } from '../actions/orders';

const useStyles = makeStyles(() => ({
    button : {
        backgroundColor: "#76ff03",
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

    return (
        <>
        <Typography variant="h5" gutterBottom>Kitchen Orders</Typography> 
        <Grid spacing={1} container>
            {orders && orders.map(order => (
                <Fade key={order.id} in={!order.completed} timeout={4000}>
                <Grid item md={3} >
                    <Card>
                        <CardContent>
                        <h4>{order.phoneNumber}</h4>
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
                </Fade>
            ))}
        </Grid>
        </>
    )
}

export default Kitchen;