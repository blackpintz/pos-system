import React from 'react';
import {Card, CardContent, Typography, CardActions, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import { updateDB, deleteTrashOrderFromDB, deleteKitchenOrderFromDB } from '../actions/orders';
import { order } from '../utilities/utilities';

const DeletedOrder = (props: any) => {
    const dispatch =useDispatch();
    const {order} = props
    const {phoneNumber, paid, total, id} = order.order

    const handleRestore = (id: string | null, orderToRestore: order, orderId: string | null) => {
        const orderToDispatch = {
            ...orderToRestore,
            deleted: false
        }
        dispatch(updateDB(orderId, orderToDispatch));
        dispatch(deleteTrashOrderFromDB(id))
    }

    const handleDeleteCompletely = (id: string | null, orderId: string | null) => {
        dispatch(deleteKitchenOrderFromDB(orderId))
        dispatch(deleteTrashOrderFromDB(id))
    }
    return (
        <>
        <Card>
            <CardContent>
                <Typography variant="h6">Order by: {phoneNumber} </Typography>
                <Typography variant="body1">Paid: {paid ? "Yes" : "No"}</Typography>
                <Typography variant="body1">Total Amount for the order: {total}</Typography>
                <Typography variant="h6">Reason for delete: {order.reason}</Typography>
            </CardContent>
            <CardActions>
                <Button 
                variant="contained" 
                color="primary"
                onClick={() => handleRestore(order.id, order.order, id)}>
                    Restore Order
                </Button>
                <Button 
                variant="contained" 
                color="primary"
                onClick={() => handleDeleteCompletely(order.id, id)}>
                    Delete Completely
                </Button>
            </CardActions>
        </Card>
        </>
    )
}

export default DeletedOrder;