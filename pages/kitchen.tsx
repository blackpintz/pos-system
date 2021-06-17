import React, { useEffect} from 'react';
import {Card, CardContent, CardActions, Grid, Typography, Button} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import pluralize from 'pluralize'
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import { fetchIncompleteOrdersFromDB, updateDB } from '../actions/orders';

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
    items: {
        position: 'relative',
        marginLeft: "0vw",
        left: 0,
        textAlign: "left",
        fontSize: "0.75rem",
          [theme.breakpoints.down('sm')]:{
            fontSize: "1rem",
          }
    },
    phone: {
      position: "absolute",
      top: "-1vh",
      right: "2vw",
      fontSize: "1.25rem",
        [theme.breakpoints.down('sm')]:{
          fontSize: "1rem",
        }
    },
    time: {
      position: "absolute",
      top: "-1vh",
      left: "2vw",
      fontSize: "1.25rem",
        [theme.breakpoints.down('sm')]:{
          fontSize: "1rem",
        }
    },
    cost:{
      position: "absolute",
      bottom: "0vh",
      left: "2vw",
      color: "purple",
      fontSize: "1.25rem",
        [theme.breakpoints.down('sm')]:{
          fontSize: "1rem",
        }
    },
    con:{
      padding: "3rem",
    },
    card: {
        backgroundColor: "#fff",
        margin: "0 auto",
        minHeight: "20vh",
        position: "relative",
        padding: "2vh",
    },
    markButton: {
        backgroundColor: "green",
        color: "#fff",
        position: "absolute",
        borderRadius: "20px",
        border: 0,
        // margin: "0 auto",
        right: "2vw",
        bottom: "2vh",
        fontSize: "1.25rem",
        width: "auto",
        height: "auto",
        [theme.breakpoints.down('sm')] : {
            fontSize: "1rem",
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
           dispatch(updateDB(id, orderToDispatch));
           setInterval(() => {
            dispatch(fetchIncompleteOrdersFromDB());
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
        dispatch(fetchIncompleteOrdersFromDB());
    }, [])

    const checkQuantity = (quantity: number, item: string) => (
        quantity <= 1 ? `${quantity} ${item}`: `${quantity} ${pluralize(item)}`
    )
    const re1 = /(0?[1-9]|1[0-2]):[0-5][0-9]./
    // const re0 = /([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/
    // const re2 = /([0-1]?\d|2[0-3]):(([0-5]\d)).(([0-5]\d))/

    return (
        <>
        <Typography align="center" variant="h5" gutterBottom>Kitchen Orders</Typography>
        <Grid className={classes.grid} spacing={1} container>
            {orders && orders.map(order => (
                <Grid item md={12} xs={12} key={order.id} >
                    <Card className={classes.card}>

                        <CardContent className={classes.con}>
                        <h4 className={classes.time}>{(order.created_at).match(re1)}</h4>
                        <h4 className={classes.phone}>{order.phoneNumber}</h4>
                        <ul>
                            {order.orders.map(item => (
                                <h1 className={classes.items} key={item.id}>{checkQuantity(item.quantity, item.name)}</h1>
                            ))}
                        </ul>
                        <h2 className={classes.cost}>KES {order.total}</h2>
                        </CardContent>
                        <CardActions>
                            {!order.completed ? (
                            <Button
                            className={classes.markButton}
                            onClick={() => handleUpdate(order.id, order) }
                            variant="outlined"
                            color="primary">Complete</Button>
                            ) : (
                                <Button
                                variant="contained"
                                className={classes.completeButton}
                                startIcon={<DoneIcon />}>Order Completed</Button>
                            )}

                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    )
}

export default Kitchen;
