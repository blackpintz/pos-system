import React, {useState} from 'react'
import {TableContainer, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton,
Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Collapse} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {addOrderItemToDB} from '../actions/orders'
import countryCodes from '../store/countryCodes';
import { orderDetails } from '../utilities/utilities';

const useStyles = makeStyles(theme => ({
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
        width: "100%",
        [theme.breakpoints.down('sm')] : {
            margin: "0.4rem 0"
        }
    },

    dialog: {
        [theme.breakpoints.down('sm')] : {
            minWidth: "100px"
        }
    }
}))

const Checkout = (props: any) => {
    const {data, handleDelete, handleDeleteAll} = props

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('+254');
    const [Invalid, setInValid] = useState(false)
    const [notification, setNotification] = useState(false)

    const dispatch = useDispatch()


    const handleTotal = () => {
        let total = 0
        data.forEach((item: orderDetails) => {
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
        phoneNumber: phone.toString().charAt(0) === "0" ? `${code}${phone.toString().substring(1)}` : `${code}${phone}`,
        total: handleTotal(),
        created_at: new Date().toISOString(),
        completed: false,
        completed_time: "pending",
        paid: false
    }

    const handleOrders = () => {
        let str = phone.toString()
        if((str.charAt(0) !== "0" && str.length !== 9) || (str.charAt(0) === "0" && str.length !== 10)) {
            setInValid(true);
        } else {
            dispatch(addOrderItemToDB(orderData))
            handleDeleteAll()
            setOpen(false);
            setPhone('');
            setCode('+254')
            setInValid(false)
            setNotification(true)
            setInterval(() => {
                setNotification(false)
              }, 5000);
        }
    }


    return (
        <>
        <Typography variant="h6" align="center">Orders</Typography>
        <Box>
            <Collapse in={notification}>
                <Alert
                variant="filled"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setNotification(false);
                    }}
                    >
                         <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                Order successfully created!
                </Alert>
            </Collapse>
        </Box>
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
                    {data.map((element: orderDetails) => (
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
                <DialogContent  className={classes.dialog}>
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
                        />
                        <Box mt={1}>
                            <Collapse in={Invalid}>
                                <Alert
                                severity="error"
                                action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setInValid(false)
                                    }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                                >
                                    Your Phone number is invalid
                                </Alert>
                            </Collapse>
                        </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="primary">Cancel</Button>
                    <Button onClick={handleOrders} variant="outlined"  color="primary">Submit</Button>
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
