import React, { useEffect} from 'react';
import {Card, CardContent, CardActions, Grid, Typography, Chip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {updateDB, fetchCompleteOrdersFromDBDay } from '../../actions/orders';
import {order} from '../../utilities/utilities';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles(theme => ({
    grid: {
        width: "96%",
        margin: "0 auto"
    },
    items: {
        position: "relative",
        margin: 0,
        padding: 0,
        textAlign: "left",
        fontSize: "0.75rem",
        [theme.breakpoints.down('sm')]:{
            fontSize: "1rem",
          }
    },
    phone: {
        // position: "absolute",
        // top: "-1px",
        // right: "2px",
        fontSize: "1rem",
        [theme.breakpoints.down('sm')]:{
            fontSize: "1.25rem",
          }
    },
    cost: {
        // position: "absolute",
        // bottom: "0",
        left: "2px",
        color: "#9c27b0",
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
    notComplete:{
      backgroundColor: "#f44336",
      color: "#fff",
      padding: 0,
      margin: "0.1rem",
    },
    markButton : {
        backgroundColor: "#f44336",
        color: "#fff",
        position: "relative",
        borderRadius: "20px",
        border: "0",
        left: "2px",
        top: "0",
        fontSize: "1.25rem",
        width: "auto",
        height: "auto",
        [theme.breakpoints.down('sm')] : {
            fontSize: "1rem",
        }
    },
    paidButton: {
        backgroundColor: "#32936F",
        color: "#fff",
        borderRadius: "20px"
    },

    paidChip: {
        backgroundColor: "#32936F",
        color: "#fff",
        padding: 0,
        margin: "0.1rem",
    },
    unpaidChip: {
        backgroundColor: "#EF626C",
        color: "#fff",
        padding: 0,
        margin: "0.1rem",
    }
}))


const Accounting = () => {
    const classes = useStyles();
    const dispatch =useDispatch();
    const handleCompleteUpdate = (id: string | null, orderToUpdate: order) => {
           const orderToDispatch = {
               ...orderToUpdate,
               completed: false,
               completed_time: "pending"
           }
           dispatch(updateDB(id, orderToDispatch));
      };

    const handlePaidUpdate = (id: string | null, orderToUpdate: order) => {
        const orderToDispatch = {
            ...orderToUpdate,
            paid: true
        }
        dispatch(updateDB(id, orderToDispatch));
    }

    interface RootState {
        Orders: [order]
    }

    const orders = useSelector((state: RootState)=> state.Orders).filter(item => item.id !== '');

    useEffect(() => {
        dispatch(fetchCompleteOrdersFromDBDay());
    }, [])


    return (
        <>
        <Typography align="center" variant="h5" gutterBottom>24 Hours Orders</Typography>
        <Grid className={classes.grid} spacing={1} container>
            {orders && orders.map(order => (
                <Grid item xs={12} key={order.id} >
                    <Card className={classes.card}>
                    <CardActions>
                        <Chip className={classes.notComplete}
                        label="Not Complete"
                        onClick={() => handleCompleteUpdate(order.id, order)}
                        icon={<BlockIcon />} />
                        {order.paid ? (
                            <Chip
                            label="Paid"
                            className={classes.paidChip} />
                        ) : (
                          <Chip
                          label="UnPaid"
                          className={classes.unpaidChip}
                          onClick={handlePaidUpdate()} />
                        )}
                    </CardActions>
                        <CardContent className={classes.con}>
                        <h4 className={classes.phone}>{order.phoneNumber} {order.created_at}</h4>
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
