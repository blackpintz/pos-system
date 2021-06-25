import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {Grid, Paper, Typography, Card, CardContent, CardActions, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import {getMenufromDB} from '../actions/menu';
import Checkout from './Checkout';

const useStyles = makeStyles(theme => ({
    root: {
      minWidth: 75,
      [theme.breakpoints.down('sm')] : {
          minWidth: 50,
      }
    },

    action: {
        // width: "50%",
        // display: "flex",
        // [theme.breakpoints.down('sm')] : {
        //     flexDirection: "column",
        //     alignItems: "flex-start"
        // }
    },

    button: {
        textTransform: "none",
        color: "#795548",
        backgroundColor: "#d3d3de",
        margin: "0rem",
        [theme.breakpoints.down('sm')] : {
            width: "10px",
            height: "10px"
        }
    },

    price: {
        flexGrow: 1,
        fontSize: "1rem",
        margin: "0rem",
        [theme.breakpoints.down('sm')] : {
            flexGrow: 0,
            fontSize: "0.5rem",
        }
    },

    name: {
      fontSize: "1rem",
      margin: "0 0",
        [theme.breakpoints.down('sm')] : {
            fontSize: "1rem"
        }},
    category: {
      fontSize: ".77rem",
      margin: "0 0",
        [theme.breakpoints.down('sm')] : {
            fontSize: ".55rem"
        }
    }
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
        if(data.some((item: {id: string, name: string, price: number, quantity: number})=> item.name === name)) {
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

    const checkQuantity = (name: string) => {
        const foundItem = data.find(element => element.name === name)
        return foundItem === undefined ? false : foundItem.quantity > 0
    }

    const handleDeleteAll = () => {
        setData([])
    }

    const handleRemoveFromCart = (name: string) => {
        if(data.some((item: {id: string, name: string, price: number, quantity: number})=> item.quantity === 1)){
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
                                            {item.category}
                                        </Typography>
                                        <Typography className={classes.name} >
                                            {item.name}
                                        </Typography>
                                        <Typography className={classes.price} >KES {item.price}</Typography>
                                    </CardContent>
                                    <CardActions className={classes.action}>
                                          <IconButton
                                            onClick = {() => handleCart(item.price, item.name)}
                                            className={classes.button}>
                                            <AddIcon fontSize="small" />
                                          </IconButton>
                                          {checkQuantity(item.name) ? (
                                              <IconButton
                                                onClick = {() => handleRemoveFromCart(item.name)}
                                                className={classes.button}>
                                                    <RemoveIcon fontSize="small"/>
                                                </IconButton>
                                            ) : (<></>)}
                                    </CardActions>
                                </Card>
                            </Grid>
                          ))}
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
