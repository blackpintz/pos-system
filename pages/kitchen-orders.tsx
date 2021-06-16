import React, { useEffect} from 'react';
import {Card, CardContent, CardActions, Grid, Typography, Button} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import pluralize from 'pluralize'
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import { fetchIncompleteOrdersFromDB, updateDB } from '../actions/orders';

<<<<<<< HEAD
const useStyles = makeStyles(theme => ({
    completeButton : {
        backgroundColor: "#76ff03",
=======
const useStyles = makeStyles(() => ({
    button : {
        position: "absolute", right: "1rem", marginBottom: "2rem",
        backgroundColor: "#000",
>>>>>>> f939ce00539ed4721bc83c37a804945e1fb78e9a
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
            margin: "0 auto"
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
<<<<<<< HEAD
           dispatch(updateDB(id, orderToDispatch));
           setInterval(() => {
            dispatch(fetchIncompleteOrdersFromDB()); 
          }, 2000);    
=======
           dispatch(updateDB(id, orderToDispatch))
>>>>>>> f939ce00539ed4721bc83c37a804945e1fb78e9a
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
<<<<<<< HEAD

    const checkQuantity = (quantity: number, item: string) => (
        quantity <= 1 ? `${quantity} ${item}`: `${quantity} ${pluralize(item)}`
    )


    return (
        <>
        <Typography align="center" variant="h5" gutterBottom>Kitchen Orders</Typography> 
        <Grid className={classes.grid} spacing={1} container>
            {orders && orders.map(order => (
                <Grid item md={3} xs={6} key={order.id} >
=======
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
>>>>>>> f939ce00539ed4721bc83c37a804945e1fb78e9a
                    <Card>
                        <CardContent>
                        <h4>{order.phoneNumber} - Would be nice to know customer name too</h4>
                        <h2>{order.created_at} - regex to show the TIME</h2>
                        <ul>
                            {order.orders.map(item => (
                                <li key={item.id}>{checkQuantity(item.quantity, item.name)}</li>
                            ))}
                        </ul>
                        <h4>Price of order: Kes.{order.total}</h4>
                        </CardContent>
                        <CardActions>
                            {!order.completed ? (
                            <Button
<<<<<<< HEAD
                            className={classes.markButton} 
=======
>>>>>>> f939ce00539ed4721bc83c37a804945e1fb78e9a
                            onClick={() => handleUpdate(order.id, order) }
                            variant="outlined"
                            className={classes.button}
                            color="primary">Mark as complete</Button>
                            ) : (
<<<<<<< HEAD
                                <Button 
                                variant="contained" 
                                className={classes.completeButton}
=======
                                <Button
                                variant="contained"
                                className={classes.button}
>>>>>>> f939ce00539ed4721bc83c37a804945e1fb78e9a
                                startIcon={<DoneIcon />}>Order Completed</Button>
                            )}

                        </CardActions>
                    </Card>
                </Grid>
<<<<<<< HEAD
=======
                </Grid>
                </Fade>
>>>>>>> f939ce00539ed4721bc83c37a804945e1fb78e9a
            ))}
        </Grid>
        </Grid>
        </>
    )
}

export default Kitchen;
