import React from 'react'
import {Typography} from '@material-ui/core' 

const Checkout = (props: any) => {
    const {data} = props
    console.log(data)
    return (
        <>
        <Typography variant="h6" align="center">Orders</Typography>
        </>
    )
}

export default Checkout