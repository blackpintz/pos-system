import React, { useEffect} from 'react';
import {Card, CardContent, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCompleteOrdersFromDBLastMonth } from '../../actions/orders';
import {order} from '../../utilities/utilities';

const useStyles = makeStyles(theme => ({
    grid: {
        width: "96%",
        margin: "0 auto"
    },
    smaller: {
      fontSize: "0.5rem",
      padding: 0,
      margin: "0.1rem",
    },
    items: {
        position: "relative",
        marginLeft: "0",
        left: 0,
        textAlign: "left",
        fontSize: "0.75rem",
        [theme.breakpoints.down('sm')]:{
            fontSize: "1rem",
          }
    },
    phone: {
        position: "absolute",
        top: "-1px",
        right: "2px",
        fontSize: "1rem",
        [theme.breakpoints.down('sm')]:{
            fontSize: "1.25rem",
          }
    },
    cost: {
        position: "absolute",
        bottom: "0",
        left: "2px",
        color: "#9c27b0",
        fontSize: "1.25rem",
        [theme.breakpoints.down('sm')]:{
            fontSize: "1rem",
          }
    },
    con : {
        padding: "0.25rem",
    },
    card : {
        backgroundColor: "#fff",
        margin: "0 auto",
        padding: "2rem",
        minHeight: "20vh",
        position: "relative"
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
        backgroundColor: "#8bc34a",
        color: "#fff",
        borderRadius: "20px"
    },

    paidChip: {
        backgroundColor: "#76ff03",
        color: "#fff"
    }
}))


const Accounting = () => {
    const classes = useStyles();
    const dispatch =useDispatch();
    // const handleCompleteUpdate = (id: string | null, orderToUpdate: order) => {
    //        const orderToDispatch = {
    //            ...orderToUpdate,
    //            completed: false,
    //            completed_time: "pending"
    //        }
    //        dispatch(updateDB(id, orderToDispatch));
    //   };

    // const handlePaidUpdate = (id: string | null, orderToUpdate: order) => {
    //     const orderToDispatch = {
    //         ...orderToUpdate,
    //         paid: true
    //     }
    //     dispatch(updateDB(id, orderToDispatch));
    // }

    interface RootState {
        Orders: [order]
    }

    const orders = useSelector((state: RootState)=> state.Orders).filter(item => item.id !== '');

    useEffect(() => {
        dispatch(fetchCompleteOrdersFromDBLastMonth());
    }, [])

    const total = orders.reduce((a,v) =>  a = a + v.total , 0 )
    // console.log(total)





    return (
        <>
        <Typography align="center" variant="h5" gutterBottom>Last Month Accounting</Typography>
        <Grid className={classes.grid} spacing={1} container>
          <Grid item xs={12} key="total" >
              <Card className={classes.card}>
                  <CardContent className={classes.con}>
                  <h2>KES {total} </h2><h4>since the 1st of the month</h4>
                  </CardContent>
                </Card>
                </Grid>
            {orders && orders.map(order => (
                    <Grid item xs={12} key={order.id} >
                    <Card className={classes.card}>
                        <CardContent className={classes.con}>
                          <h2>{order.total} KES</h2>
                          <p className={classes.smaller}>{order.name} {order.phoneNumber}</p>
                          <p className={classes.smaller}>{order.id}</p>
                              <p className={classes.smaller}>
                                {order.orders.map(item => (
                                  <span>| {item.quantity}, {item.name} |</span>
                                ))}
                                </p>
                          <p className={classes.smaller}>{order.created_at}</p>
                          <p className={classes.smaller}>{order.completed_time}</p>
                        </CardContent>
                    </Card>
                    </Grid>
            ))}

        </Grid>
        </>
    )
}

export default Accounting;

// <CardActions>
// </CardActions>
// {*/
//   <ul>
//       {order.orders.map(item => (
//           <li className={classes.items} key={item.id}>{item.quantity} {item.name}</li>
//       ))}
//   </ul>
// /*}
// <CardActions>
//     <Button
//     className={classes.markButton}
//     onClick={() => handleCompleteUpdate(order.id, order) }
//     variant="contained">not complete</Button>
//     {order.paid ? (
//         <Chip
//         label="Paid"
//         className={classes.paidChip} />
//     ) : (
//         <Button
//         className={classes.paidButton}
//         variant="contained"
//         onClick={() => handlePaidUpdate(order.id, order) }>
//             Pay
//         </Button>
//     )}
// </CardActions>
