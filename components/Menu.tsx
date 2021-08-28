import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {Grid, Paper, Typography, Card, CardContent, Button} from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import {getMenufromDB} from '../actions/menu';
import Checkout from './Checkout';

const useStyles = makeStyles(theme => ({
    root: {
      position: "relative",
      padding: 0,
      backgroundColor: "#c1fba450",
      left: 0,
      minWidth: "75px",
      minHeight: "6rem",
      height: "100%",
      [theme.breakpoints.down('sm')] : {
          minWidth: 50,
      },
    },

    button_down: {
        color: "#000",
        position: "absolute",
        backgroundColor: "#ffd6e0",
        margin: "0",
        padding: "0",
        width: "100%",
        bottom: "0rem",
        height: "2rem",
        left: "0",
        borderRadius: "0rem"
    },
    button_up: {
        position: "absolute",
        color: "#000",
        backgroundColor: "#7bf1a835",
        margin: "0rem",
        padding: "0rem",
        width: "100%",
        top: "0rem",
        bottom: "2rem",
        left: 0,
        borderRadius: "0rem"
    },

    price: {
        position: "absolute",
        flexGrow: 1,
        fontSize: "0.77rem",
        margin: "0rem",
        padding: "0.1rem",
        top: 0,
        right: 0,
        [theme.breakpoints.down('sm')] : {
            fontSize: "0.5rem"
        }
    },

    name: {
      position: "absolute",
      fontSize: "1.2rem",
      margin: "0 0",
      padding: "0.1rem",
      left: 0,
      top: "1.5rem",
        [theme.breakpoints.down('sm')] : {
            fontSize: "0.8rem",
            top: "1rem",
        }
      },
    category: {
      position: "absolute",
      top: 0,
      left: 0,
      padding: "0.1rem",

      fontSize: "0.77rem",
      margin: "0 0",
        [theme.breakpoints.down('sm')] : {
            fontSize: ".5rem"
        }
    },
  }));

const Menu = () => {
    const dispatch =useDispatch()
    const classes = useStyles();
    interface initialState {
        id: string,
        name: string,
        price: number,
        quantity: number
    }
    const [data, setData] = useState<initialState[]>([])
    interface RootState {
        Menu: [{
            id: string | null,
            name: string,
            category: string,
            created_at: string,
            price: number
        }]
    }

    const menu = useSelector((state: RootState)=> state.Menu).filter(item => item.name !== '')

    useEffect(() =>{
        dispatch(getMenufromDB())
      }, [])



    const handleCart = (price: number, name: string) => {
      if(data.some((item: {id: string, name: string, price: number, quantity: number})=> item.name === name && item.quantity > 0)) {
            setData(data => data.map(item => item.name === name ? {...item, quantity: item.quantity + 1} : item))
        } else {
            setData([
                ...data,
                {
                    id: uuidv4(),
                    name,
                    price,
                    quantity: 1
                }
            ])
        }
    }

    const handleDelete = (name: string) => {
        setData(data => data.filter(item => item.name !== name))
    }
    //
    // const checkQuantity = (name: string) => {
    //     const foundItem = data.find(element => element.name === name)
    //     return foundItem === undefined ? false : foundItem.quantity > 0
    // }

    const actualQuantity = (name: string) => {
        const foundItem = data.find(element => element.name === name)
        return foundItem === undefined ? '' : foundItem.quantity
    }

    const handleDeleteAll = () => {
        setData([])
    }

    // const handleRemoveFromCart = (name: string) => {
    //     if(data.some((item: {id: string, name: string, price: number, quantity: number})=> item.quantity < 2)){
    //     setData(data => data.filter(item => item.name !== name))
    //   } else {
    //     setData(data => data.map(item => item.name === name ? {...item, quantity: item.quantity - 1} : item))
    //   }
    // }
    const handleRemoveFromCart = (name: string) => {
      if (actualQuantity(name) < 2){
        setData(data => data.filter(item => item.name !== name))
      } else {
        setData(data => data.map(item => item.name === name ? {...item, quantity: item.quantity - 1} : item))
      }
    }

    return (
        <Grid spacing={1} container>
            <Grid item md={8} xs={12}>
                <Paper elevation={0}>
                    <Grid container spacing={1}>
                        {menu && menu.map(item => (
                            <Grid key={item.id} item md={3} xs={4}>
                                <Card className={classes.root} variant="outlined">
                                    <CardContent>
                                    <Typography className={classes.category} >
                                        {item.category}:
                                    </Typography>
                                        <Typography className={classes.name} >
                                            {item.name}
                                        </Typography>
                                        <Typography className={classes.price} >KES {item.price}</Typography>
                                        <Button
                                          onClick = {() => handleCart(item.price, item.name)}
                                          className={classes.button_up}>
                                        </Button>
                                        <Button
                                          onClick = {() => handleRemoveFromCart(item.name)}
                                          className={classes.button_down}>
                                          {actualQuantity(item.name)}
                                          </Button>
                                    </CardContent>

                                </Card>
                            </Grid>
                          ))}
                          <Grid key={'delivery'} item md={3} xs={4}>
                              <Card className={classes.root} variant="outlined">
                                  <CardContent>
                                  <Typography className={classes.category} >
                                      Delivery
                                  </Typography>
                                      <Typography className={classes.name} >
                                          Delivery
                                      </Typography>
                                      <Typography className={classes.price} >KES 25</Typography>
                                      <Button
                                        onClick = {() => handleCart(25, "Delivery")}
                                        className={classes.button_up}>
                                      </Button>
                                      <Button
                                        onClick = {() => handleRemoveFromCart("Delivery")}
                                        className={classes.button_down}>
                                        {actualQuantity("Delivery")}
                                        </Button>
                                  </CardContent>
                              </Card>
                          </Grid>

                    </Grid>
                </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
                <Paper elevation={0}>
                    <Checkout
                    data={data}
                    handleDelete={handleDelete}
                    handleDeleteAll={handleDeleteAll} />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Menu
//
// <Grid key={'Discount'} item md={3} xs={4}>
//     <Card className={classes.root} variant="outlined">
//         <CardContent>
//         <Typography className={classes.category} >
//             Discount
//         </Typography>
//             <Typography className={classes.name} >
//                 Discount
//             </Typography>
//             <Typography className={classes.price} >KES 25</Typography>
//             <Button
//               onClick = {() => handleCart(, "Discount")}
//               className={classes.button_up}>
//             </Button>
//             <Button
//               onClick = {() => handleRemoveFromCart("Discount")}
//               className={classes.button_down}>
//               {actualQuantity("Discount")}
//               </Button>
//         </CardContent>
//     </Card>
// </Grid>
