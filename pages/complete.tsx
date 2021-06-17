import React, { useEffect} from 'react';
import {Card, CardContent, CardActions, Grid, Typography, Button} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import { fetchCompleteOrdersFromDB, updateDB } from '../actions/orders';

const useStyles = makeStyles(theme => ({
    grid: {
        width: "96%",
        margin: "0 auto"
    },
    completeButton : {
        backgroundColor: "#76ff03",
        color: "#fff",
        '&:hover': {
            backgroundColor: "#76ff03",
            color: "#fff"
        },
        [theme.breakpoints.down('sm')] : {
            fontSize: "0.7rem"
        },
    },
    items: {
        position: "relative",
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
        fontSize: "1rem",
        [theme.breakpoints.down('sm')]:{
            fontSize: "1.25rem",
          }
    },
    cost: {
        position: "absolute",
        bottom: "0vh",
        left: "2vw",
        color: "purple",
        fontSize: "1.25rem",
        [theme.breakpoints.down('sm')]:{
            fontSize: "1rem",
          }
    },
    con : {
        padding: "3rem",
    },
    card : {
        backgroundColor: "#fff",
        margin: "0 auto",
        padding: "2rem",
        minHeight: "20vh",
        position: "relative"
    },
    markButton : {
        backgroundColor: "red",
        color: "#fff",
        position: "absolute",
        borderRadius: "20px",
        border: 0,
        left: "2vw",
        top: "0",
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
                <Grid item md={12} xs={12} key={order.id} >
                    <Card className={classes.card}>
                    <CardActions>
                        {order.completed ? (
                        <Button
                        className={classes.markButton}
                        onClick={() => handleUpdate(order.id, order) }
                        variant="contained">not complete</Button>
                        ) : (
                            <Button
                            variant="contained"
                            className={classes.completeButton}
                            startIcon={<DoneIcon />}>Order should appear in the kitchen section!</Button>
                        )}
                    </CardActions>
                        <CardContent className={classes.con}>
                        <h4 className={classes.phone}>{order.phoneNumber}</h4>
                        <ul>
                            {order.orders.map(item => (
                                <li className={classes.items} key={item.id}>{item.quantity} {item.name}</li>
                            ))}
                        </ul>
                        <h4 className={classes.cost}>Cost: KES.{order.total}</h4>
                        </CardContent>

                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    )
}

export default Accounting;
