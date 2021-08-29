import { useRouter } from 'next/router'
import React, { useEffect} from 'react';
import {fetchCompleteOrdersFromDB } from '../../actions/orders';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {order} from '../../utilities/utilities';
import Image from 'next/image'

import {Card, CardContent, Grid, Table, TableHead, TableRow, TableCell} from '@material-ui/core';
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
const Post = () => {
  const router = useRouter();
  const { slug } = router.query;
  const classes = useStyles();
  const getOrder = () => {
      const dispatch =useDispatch();

      useEffect(() => {
          dispatch(fetchCompleteOrdersFromDB());
      }, [])

      interface RootState {
          Orders: [order]
      }
      let orders_all =  useSelector((state: RootState)=> state.Orders)
      console.log('there')
    return orders_all.filter(item => (item.id===slug));

  }
  // console.log('orders')
  // console.log(ordersx)
 console.log('here')
 let orderX = getOrder()


  return (
      <>
      <h1>{slug}</h1>
      <Grid className={classes.grid} spacing={1} container>
          {orderX.map(order => (
                  <Grid item xs={12} key={order.id} >
                  <Card className={classes.card}>
                      <CardContent className={classes.con}>
                      <h1>Vegan Basket Reciept</h1>
                        <h2>Total {order.total} KES</h2>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                    </TableRow>
                                </TableHead>

                              {order.orders.map(item => (
                                <TableRow>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center">{item.price}</TableCell>
                                    <TableCell align="center"> {item.quantity}</TableCell>
                                </TableRow>
                              ))}
                      </Table>

                        <p>{new Date(order.created_at).toLocaleTimeString([], { weekday:'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                      </CardContent>
                  </Card>
                  </Grid>
          ))}
          <Image src='/vegan-basket-logo.svg' alt='' layout="fill" />

      </Grid>
      </>)
}

export default Post
