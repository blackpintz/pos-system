import React, {useEffect} from 'react';
import {Grid, Typography} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DeletedOrder from '../components/DeletedOrder';
import { deletedOrder } from '../utilities/utilities';
import { fetchDeletedOrdersFromDB } from '../actions/orders';

const useStyles = makeStyles(() => ({
    grid: {
        width: "96%",
        margin: "0 auto",
        textShadow: "rgba(255,255,255,0.5) 0px 0px 0.25rem",
    }
  }))

const DeletedOrdersPage = () => {
    const dispatch =useDispatch();
    const classes = useStyles();

    interface RootState {
        Orders: [deletedOrder]
    }

    const orders = useSelector((state: RootState)=> state.Orders).filter(item => item.id !== '');

    useEffect(() => {
        dispatch(fetchDeletedOrdersFromDB())
    }, [])

    return (
        <>
            <Typography align="center" variant="h5" gutterBottom>Deleted Orders</Typography>
            <Grid className={classes.grid} container spacing={1}>
                {orders && orders.map(order => (
                    <Grid item key={order.id} md={6} xs={12}>
                        <DeletedOrder order={order} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default DeletedOrdersPage