import React, { useEffect} from 'react';
import {Card, CardContent, CardActions, Grid, Typography, Button} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import { fetchCompleteOrdersFromDB, updateDB } from '../actions/orders';

const useStyles = makeStyles(theme => ({
    completeButton : {
        backgroundColor: "#76ff03",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#76ff03",
            color: "#fff"
        },
        [theme.breakpoints.down('sm')] : {
            fontSize: "0.7rem"
        }
    },
    grid: {
        width: "96%",
        margin: "0 auto"
    },
    markButton: {
        backgroundColor: "#795548",
        color: "#fff",
        borderRadius: "20px",
        [theme.breakpoints.down('sm')] : {
            width: "100px",
            height: "auto",
            fontSize: "0.5rem",
            margin: "0 auto",
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

const Accounting = () => {
    const classes = useStyles();
    const dispatch =useDispatch();
    const handleUpdate = (id: string | null, orderToUpdate: order) => {
           const orderToDispatch = {
               ...orderToUpdate,
               completed: false
           }
           dispatch(updateDB(id, orderToDispatch));
           setInterval(() => {
            dispatch(fetchCompleteOrdersFromDB()); 
          }, 2000);    
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
        dispatch(fetchCompleteOrdersFromDB());
    }, [])


    return (
        <>
        <Typography align="center" variant="h5" gutterBottom>Completed Orders</Typography> 
        <Grid className={classes.grid} spacing={1} container>
            {orders && orders.map(order => (
                <Grid item md={3} xs={6} key={order.id} >
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
                            {order.completed ? (
                            <Button
                            className={classes.markButton} 
                            onClick={() => handleUpdate(order.id, order) }
                            variant="contained">Mark as not complete</Button>
                            ) : (
                                <Button 
                                variant="contained" 
                                className={classes.completeButton}
                                startIcon={<DoneIcon />}>Order should appear in the kitchen section!</Button>
                            )}

                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    )
}

export default Accounting;