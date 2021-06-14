import React, {useState, useEffect} from 'react';
import {Card, CardContent, CardActions, Checkbox} from '@material-ui/core';
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
    
    // interface RootState {
    //     Orders: [{
    //         id: string | null,
    //         orders: any[],
    //         phoneNumber: string,
    //         total: number,
    //         created_at: string,
    //         completed: boolean,
    //         completed_time: string
    //     }]
    // }

    // const orders = useSelector((state: RootState)=> state.Orders).filter(item => item.id !== '')
    // console.log(orders);
    
    useEffect(() => {
        dispatch(fetchIncompleteOrdersFromDB());
        console.log("It is dispatched.")
    }, [])

    return (
        <>
        <Card>
            <CardContent></CardContent>
            <CardActions>
                <Checkbox
                checked={checked}
                onChange={handleChange} />
            </CardActions>
        </Card>
        </>
    )
}

export default Kitchen;