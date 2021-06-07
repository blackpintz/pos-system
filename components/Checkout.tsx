import React from 'react'
import {TableContainer, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton,
Box, Button} from '@material-ui/core' 
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    button: {
        marginTop: "2rem",
        width: "90%",
        borderRadius: "2rem"
    },

    resetBtn: {
        marginTop: "1.2rem",
        width: "90%",
        borderRadius: "2rem"

    }
}))

const Checkout = (props: any) => {
    const {data, handleDelete, handleDeleteAll} = props

    const classes = useStyles();
    interface dataContent {
       id: string,
       name: string,
       price: number,
       quantity: number 
    }

    const handleTotal = () => {
        let total = 0
        data.forEach((item: dataContent) => {
            let result = item.price * item.quantity
            total += result
        })

        return total
    }

    const deleteFromCart = (name: string) => {
        handleDelete(name)
    }

    return (
        <>
        <Typography variant="h6" align="center">Orders</Typography>
        <TableContainer component={Paper} elevation={0}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((element: dataContent) => (
                        <TableRow component="th" key={element.id} scope="row">
                            <TableCell align="center">{element.name}</TableCell>
                            <TableCell align="center">{element.price}</TableCell>
                            <TableCell align="center">{element.quantity}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                 onClick = {() => deleteFromCart(element.name)}
                                aria-label="delete"
                                color="secondary">
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>
                            <h3>Total</h3>
                        </TableCell>
                        <TableCell align="center">
                            <h3>Kes {handleTotal()}</h3>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center">
            <Button
            onClick={handleDeleteAll}
            className={classes.resetBtn}
            variant="outlined" 
            color="secondary"
            disabled={data.length === 0}>
                Reset Order
            </Button>
        </Box>
        </>
    )
}

export default Checkout