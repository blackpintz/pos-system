import React, { useEffect} from 'react';
import {Card, CardContent, CardActions, Grid, Typography, Chip, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {updateDB, fetchCompleteOrdersFromDBWeek } from '../../actions/orders';
import {order} from '../../utilities/utilities';
import BlockIcon from '@material-ui/icons/Block';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
    grid: {
        width: "96%",
        margin: "0 auto"
    },
    box: {

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
        padding: "0.1rem",
    },
    card : {
        backgroundColor: "#fff",
        margin: "0 auto",
        padding: "2rem",
        minHeight: "20vh",
        position: "relative"
    },
    notComplete:{
      backgroundColor: "#EF626C",
      color: "#fff",
      padding: 0,
      margin: "0.1rem",
    },
    markButton : {
        backgroundColor: "#EF626C",
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
    totalChip: {
        backgroundColor: "#32936F",
        color: "#fff",
        padding: 0,
        margin: "0.1rem",
    },
    auxChip: {
        backgroundColor: "#C5C7D3",
        color: "#000",
        padding: 0,
        margin: "0.1rem",
    },
    unpaidChip: {
        backgroundColor: "#EF626C",
        color: "#fff",
        padding: 0,
        margin: "0.1rem",
    },
    timeChip: {
      backgroundColor: "#FCFF6C",
      color: "#1A181B",
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

    const ordersx = useSelector((state: RootState)=> state.Orders).filter(item => item.id !== '');
    const formatTotal = (total: number) => {return `KES ${total}`}
    // const callNumber = (number: string) => {window.open(`tel:${number}`)}
    const fireAlert = (number: string) => {window.open(`tel:${number}`,"_self")}
    useEffect(() => {
        dispatch(fetchCompleteOrdersFromDBWeek());
    }, [])
    const total = ordersx.reduce((a,v) =>  a = a + v.total , 0 )

    return (
        <>
        <Typography align="center" variant="h5" gutterBottom>Current Week Accounting</Typography>
        <Grid className={classes.grid} spacing={1} container>
        <Grid item xs={12} key="total" >
            <Card className={classes.card}>
              <CardContent className={classes.con}>
              <h2> KES {total} sold this week. </h2>
              </CardContent>
            </Card>
        </Grid>
            {ordersx && ordersx.map(order => (
                <Grid item xs={12} key={order.id} >
                    <Card className={classes.card}>
                    <CardActions>
                      <Box className={classes.box}>
                        <Chip
                        color="secondary"
                        className={classes.totalChip}
                        label={ formatTotal(order.total) }
                        icon={<ReceiptIcon />} />
                        {order.paid ? (
                            <Chip
                            label="Paid"
                            className={classes.paidChip} />
                        ) : (
                          <Chip
                          label="UnPaid"
                          className={classes.unpaidChip} />
                        )}

                        <Chip className={classes.auxChip}
                        label={order.name }
                        icon={<PersonOutlineIcon />} />
                        <Chip className={classes.auxChip}
                        label={order.phoneNumber }
                        onClick={() => fireAlert(order.phoneNumber)}
                        icon={<LocalPhoneIcon />} />
                        <Chip className={classes.timeChip}
                        label={new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        icon={<AccessTimeIcon />} />
                        </Box>

                    </CardActions>
                        <CardContent className={classes.con}>
                        <ul>
                            {order.orders.map(item => (
                                <li className={classes.items} key={item.id}>{item.quantity} {item.name}</li>
                            ))}
                        </ul>
                        {order.paid ? (<></>): (<Chip
                        color="secondary"
                        label="Mark Paid"
                        onClick={() => handlePaidUpdate(order.id, order)}
                        className={classes.paidChip}
                        icon={<DoneIcon />} /> )}

                        <Chip className={classes.notComplete}
                        color="secondary"
                        label="Not Complete"
                        onClick={() => handleCompleteUpdate(order.id, order)}
                        icon={<BlockIcon />} />
                        </CardContent>


                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    )
}

export default Accounting;
