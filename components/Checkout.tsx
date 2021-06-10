import React, {useState} from 'react'
import {TableContainer, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton,
Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField} from '@material-ui/core' 
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {addOrderItemToDB} from '../actions/orders'
import countryCodes from '../store/countryCodes';

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

    },

    phoneBox: {
        marginLeft: "1rem",
        width: "250px"
    }
}))

const Checkout = (props: any) => {
    const {data, handleDelete, handleDeleteAll} = props

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('+254')

    const dispatch = useDispatch()
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

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    }

    const orderData = {
        orders: data,
        phoneNumber: `${code}${phone}`,
        total: handleTotal(),
        created_at: new Date().toISOString(),
        completed: false,
        completed_time: "pending"
    }

    const handleOrders = () => {
        dispatch(addOrderItemToDB(orderData))
        handleDeleteAll()
        setOpen(false);
        setPhone('');
        setCode('+254')
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
            className={classes.button} 
            variant="contained" 
            color="primary"
            onClick={handleOpen}
            disabled={data.length === 0}>
            Go to checkout
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please sign up with your phone number.</DialogContentText>
                        <TextField
                        id="standard-select-phone-code"
                        select
                        label='Select'
                        value={code}
                        onChange={(e) =>{setCode(e.target.value)}} 
                        variant="outlined"
                        SelectProps={{
                            native: true,
                          }}>
                        {countryCodes.map(code => (
                            <option key={code.value} value={code.value}>{code.label}</option>
                        ))}
                        </TextField>
                        <TextField 
                        placeholder="Enter your phone number"
                        required
                        value={phone}
                        type="number"
                        variant="outlined"
                        onChange={(e) =>{setPhone(e.target.value)}} 
                        className={classes.phoneBox}
                        InputProps={{ inputProps: { min: 10, max: 10 } }}
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleOrders} color="primary">Signup</Button>
                </DialogActions>
            </Dialog>
        </Box>
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