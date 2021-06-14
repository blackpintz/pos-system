import React, {useState, useEffect} from 'react';
import {Card, CardContent, CardActions, Checkbox, Grid, Typography} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import { fetchIncompleteOrdersFromDB } from '../actions/orders';


const Kitchen = () => {
    const dispatch =useDispatch()
    const [checked, setChecked] = useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if(!checked) {
            console.log("it is checked!")
        }
      };
    
    interface RootState {
        Orders: [{
            id: string | null,
            orders: any[],
            phoneNumber: string,
            total: number,
            created_at: string,
            completed: boolean,
            completed_time: string
        }]
    }

    const orders = useSelector((state: RootState)=> state.Orders).filter(item => item.id !== '')
    
    useEffect(() => {
        dispatch(fetchIncompleteOrdersFromDB());
    }, [])

    return (
        <>
        <Typography variant="h5" gutterBottom>Kitchen Orders</Typography> 
        <Grid spacing={1} container>
            {orders && orders.map(order => (
                <Grid item md={3} key={order.id}>
                    <Card>
                        <CardContent>
                        <h4>{order.phoneNumber}</h4>
                        <ul>
                            {order.orders.map(item => (
                                <li key={item.id}>{item.quantity} {item.name}</li>
                            ))}
                        </ul>
                        </CardContent>
                        <CardActions>
                            <h4>Price of order: Kes.{order.total}</h4>
                            <Checkbox
                            checked={checked}
                            onChange={handleChange} />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    )
}

export default Kitchen;