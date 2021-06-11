import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {Grid, Paper, Typography, Card, CardContent, CardActions, IconButton, Box} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import {getMenufromDB} from '../actions/menu';
import Checkout from './Checkout';

const useStyles = makeStyles(theme => ({
    root: {
      minWidth: 275,
      [theme.breakpoints.down('sm')] : {
          minWidth: 100,
      }
    },

    action: {
        width: "100%",
        display: "flex",
        [theme.breakpoints.down('sm')] : {
            flexDirection: "column",
            alignItems: "flex-start"
        }
    },

    button: {
        textTransform: "none",
        color: "#795548",
        backgroundColor: "#d3d3de",
        margin: "0 0.2rem",
        [theme.breakpoints.down('sm')] : {
            width: "30px",
            height: "30px"
        }
    },

    price: {
        flexGrow: 1,
        marginLeft: "0.6rem",
        [theme.breakpoints.down('sm')] : {
            flexGrow: 0,
            marginLeft: "0.5rem"
        }
    },

    name: {
        [theme.breakpoints.down('sm')] : {
            fontSize: "1rem"
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
        return foundItem === undefined ? false : foundItem.quantity > 1
    }

    const handleDeleteAll = () => {
        setData([])
    }

    const handleRemoveFromCart = (name: string) => {
        setData(data => data.map(item => item.name === name ? {...item, quantity: item.quantity - 1} : item))
    }

    return (
        <Grid spacing={2} container>
            <Grid item md={8} xs={12}>
                <Paper elevation={0}>
                    <Grid container spacing={2}>
                        {menu && menu.map(item => (
                            <Grid key={item.id} item md={4} xs={6}>
                                <Card className={classes.root} variant="outlined">
                                    <CardContent>
                                        <Typography className={classes.name} variant="h5" component="h2">
                                            {item.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={classes.action}>
                                        <Typography className={classes.price} variant="caption" component="p">KES {item.price}.00</Typography>
                                        <Box>
                                        {checkQuantity(item.name) ? (
                                            <IconButton
                                            onClick = {() => handleRemoveFromCart(item.name)}
                                            className={classes.button}>
                                                <RemoveIcon fontSize="small"/>
                                            </IconButton>
                                        ) : (<></>)}
                                        <IconButton
                                        onClick = {() => handleCart(item.price, item.name)}
                                        className={classes.button}>
                                        <AddIcon fontSize="small" />
                                        </IconButton>
                                        </Box>
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