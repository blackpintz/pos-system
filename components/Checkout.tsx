import React, {useState} from 'react'
import {TableContainer, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton,
Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {addOrderItemToDB} from '../actions/orders'
import countryCodes from '../store/countryCodes';
import { orderDetails } from '../utilities/utilities';
import {AlertMsg} from './Alert';

const useStyles = makeStyles(theme => ({
    button: {
        margin: "10px",
        marginTop: "2rem",
        width: "70%",
        borderRadius: "2rem"
    },
    button_discount: {
      margin: "10px",
        marginTop: "2rem",
        width: "20%",
        borderRadius: "2rem",
        backgroundColor: 'indigo'
    },


    resetBtn: {
        marginTop: "1.2rem",
        width: "90%",
        borderRadius: "2rem"

    },


    phoneBox: {
        marginTop: "0.5rem",
        width: "100%",
        [theme.breakpoints.down('sm')] : {
            margin: "0.4rem 0"
        }
    },

    dialog: {
        padding: "8px 20px",
        minWidth: "420px",
        [theme.breakpoints.down('sm')] : {
            minWidth: "100px"
        }
    },
    instructionsTitle: {
        backgroundColor: "#D3D3D3",
        paddingLeft: "0.8rem",
        margin: "0.5rem 0"
    }
}))

const Checkout = (props: any) => {
    const {data, handleDelete, handleDeleteAll} = props

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [code, setCode] = useState('+254');
    const [name, setName] = useState('');
    const [instruction, setInstruction] = useState('')
    const [Invalid, setInValid] = useState(false);
    const [notification, setNotification] = useState(false);
    const [discount, setDiscount] = useState(0)

    const dispatch = useDispatch()


    const handleTotal = () => {
        let total = 0
        data.forEach((item: orderDetails) => {
            let result = item.price * item.quantity
            total += result
        })
        total = total * (1-discount/100)
        return total
    }

    const handleDiscount = () => {
      if (discount < 50) {setDiscount(discount+5)} else {}

    }

    const removeDiscount = () => {
      setDiscount(0)
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
        paid: false,
        name: name !== '' ? name : "Anonymous",
        address: address !== '' ? address : "None",
        instruction: instruction !== '' ? instruction : "None",
        deleted: false

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
            setName('');
            setInstruction('');
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
        <AlertMsg
        msg="Thank you for your order"
        valid={notification}
        handleValid={() => setNotification(false)}
        type="pass" />
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
                    <TableRow component="th" key='discount' scope="row">
                        <TableCell align="center">Discount</TableCell>
                        <TableCell align="center">{discount}%</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">
                            <IconButton
                             onClick = {() => removeDiscount()}
                            aria-label="delete"
                            color="secondary">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
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
            checkout
            </Button>
            <Button
            className={classes.button_discount}
            variant="contained"
            color="primary"
            onClick={handleDiscount}
            disabled={data.length === 0}>
            discount
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Checkout</DialogTitle>
                <DialogContent  className={classes.dialog}>
                    <DialogContentText>customer phone number.</DialogContentText>
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
                        placeholder="phone number"
                        required
                        value={phone}
                        type="number"
                        variant="outlined"
                        onChange={(e) =>{setPhone(e.target.value)}}
                        className={classes.phoneBox}
                        />
                        <AlertMsg msg="Your phone is invalid" valid={Invalid} handleValid={()=>setInValid(false)} type="fail" />
                        <TextField
                        placeholder="Name"
                        type="string"
                        value={name}
                        variant="outlined"
                        fullWidth
                        onChange={(e) =>{setName(e.target.value)}} />
                        <TextField
                        placeholder="Address"
                        type="string"
                        value={address}
                        variant="outlined"
                        fullWidth
                        onChange={(e) =>{setAddress(e.target.value)}} />
                        <Typography variant="body1" className={classes.instructionsTitle}>Special Instructions</Typography>
                        <TextField
                        placeholder="Add preferences (extra sauce, No pepper, etc)"
                        fullWidth
                        multiline
                        value={instruction}
                        variant="outlined"
                        type="string"
                        rows={3}
                        onChange={(e) =>{setInstruction(e.target.value)}} />
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
