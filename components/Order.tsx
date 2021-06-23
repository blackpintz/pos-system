import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { Card, CardActions, CardContent, Button, Box, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { updateDB } from '../actions/orders';
import { checkQuantity, orderDetails, order } from '../utilities/utilities';

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: "#fff",
        margin: "0 auto",
        minHeight: "20vh",
        position: "relative",
        padding: "2vh",
    },
    con:{
      padding: "3rem",
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
    phone: {
      position: "absolute",
      top: "-1vh",
      right: "2vw",
      fontSize: "1.25rem",
        [theme.breakpoints.down('sm')]:{
          fontSize: "1rem",
        }
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
    },
    section: {
        display: "flex",
        justifyContent: "center",
        '& h4': {
            fontSize: "1rem",
            margin: "0.3rem 0"
        },
        '& h4:first-child': {
            marginRight: "0.3rem"
        }
    },
    box:{
        width: "100%",
        margin: "0 auto",
        backgroundColor: "#3e2723",
        color: "#fff",
        padding: "0.5rem 0",
        borderRadius: "10px"
    }
}))

const Order = (props: any) => {
    const classes = useStyles();
    const [minLapsed, setMinLapsed] = useState(0)
    const [secLapsed, setSecLapsed] = useState(0)
    const dispatch =useDispatch();
    const handleUpdate = (id: string | null, orderToUpdate: order) => {
        const orderToDispatch = {
            ...orderToUpdate,
            completed: true,
            completed_time: new Date().toISOString()
        }
        dispatch(updateDB(id, orderToDispatch));
   };


    const re1 = /(0?[1-9]|1[0-2]):[0-5][0-9]./
    const {order} = props
   useEffect(() => {
       setInterval(() => {
        const newTime = new Date();
        const oldTime = new Date(order.created_at)
        const diff = newTime.getTime() - oldTime.getTime()
        const diffInMins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const diffInSecs = Math.floor((diff % (1000 * 60)) / 1000)
        setMinLapsed(diffInMins)
        setSecLapsed(diffInSecs)
       }, 1000)
    })

    return (
        <Card className={classes.card}>
            <CardContent className={classes.con}>
                <Box className={classes.box}>
                    <Typography align="center" variant="h6">Order Created:</Typography>
                    <section className={classes.section}>
                        <h2>{minLapsed} : {secLapsed}　</h2>
                        <h2> minutes ago.</h2>
                    </section>
                </Box>
                <h4 className={classes.time}>{(order.created_at).match(re1)}</h4>
                <h4 className={classes.phone}>{order.phoneNumber}</h4>
                <ul>
                    {order.orders.map((item: orderDetails) => (
                        <h1 className={classes.items} key={item.id}>{checkQuantity(item.quantity, item.name)}</h1>
                    ))}
                </ul>
                <h2 className={classes.cost}>KES {order.total}</h2>
            </CardContent>
            <CardActions>
                <Button
                className={classes.markButton}
                onClick={() => handleUpdate(order.id, order) }
                variant="outlined"
                color="primary">
                    Complete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Order;
