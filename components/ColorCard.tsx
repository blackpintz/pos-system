import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { Card, CardActions, CardContent, Button, Box, Typography, Dialog, DialogContent,  DialogContentText,
TextField, Chip, DialogActions} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { updateDB, addDeletedOrderToDB } from '../actions/orders';
import { checkQuantity, orderDetails, order } from '../utilities/utilities';
import {AlertMsg} from '../components/Alert'
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

import ReceiptIcon from '@material-ui/icons/Receipt';


type Props = {
    color: string
}

const useStyles = makeStyles<Theme, Props>(theme => ({
    card: {
        backgroundColor: props => `${props.color}`,
        transition: "all 0.5s ease-in",
        margin: "0 auto",
        minHeight: "20vh",
        position: "relative",
        padding: "2vh",
    },
    con:{
      padding: "3rem",
    },
    time: {
      position: "absolute",
      top: "-1vh",
      left: "2vw",
      fontSize: "1.25rem",
        [theme.breakpoints.down('sm')]:{
          fontSize: "1rem",
        }
    },
    phone: {
      position: "absolute",
      top: "-1vh",
      right: "2vw",
      fontSize: "1.25rem",
        [theme.breakpoints.down('sm')]:{
          fontSize: "1rem",
        }
    },
    items: {
        position: 'relative',
        marginLeft: "0vw",
        left: 0,
        textAlign: "left",
        fontSize: "0.75rem",
          [theme.breakpoints.down('sm')]:{
            fontSize: "1rem",
          }
    },
    cost:{
      position: "absolute",
      bottom: "0vh",
      left: "2vw",
      color: "purple",
      fontSize: "1.25rem",
        [theme.breakpoints.down('sm')]:{
          fontSize: "1rem",
        }
    },
    markButton: {
        backgroundColor: "green",
        color: "#fff",
        position: "absolute",
        borderRadius: "20px",
        border: 0,
        // margin: "0 auto",
        right: "2vw",
        bottom: "2vh",
        fontSize: "1.25rem",
        width: "auto",
        height: "auto",
        [theme.breakpoints.down('sm')] : {
            fontSize: "1rem",
        }
    },
    section: {
        display: "flex",
        justifyContent: "center",
        '& h4': {
            fontSize: "1rem",
            margin: "0.3rem 0"
        },
        '& h4:first-child': {
            marginRight: "0.3rem"
        },
        '& h2' : {
            margin: "0 0.3rem"
        }
    },
    box:{
        backgroundColor: props => `${props.color}`,
        transition: "all 0.5s ease-in",
        width: "100%",
        margin: "0 auto",
        color: "#000",
        padding: "0.5rem 0",
        borderRadius: "10px"
    },
    auxChip:{
      position: "relative",
      margin: "2px"
    },
    box2: {
      position: "absolute",
      top: "0.5rem",
      right: "0.5rem"
    },
    trashButton : {
        display: "none",
        backgroundColor: "#2F4F4F",
        color: "#fff",
        position: "absolute",
        right: "15vw",
        bottom: "2vh",
        borderRadius: "20px",

    }
}))


const ColorCard = (props: any) => {
    const classes = useStyles(props);
    const dispatch =useDispatch();
    const [open, setOpen] = useState(false)
    const [reason, setReason] = useState('')
    const [show, setShow] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleValid = () => {
        setShow(false)
    }

    const handleUpdate = (id: string | null, orderToUpdate: order) => {
        const orderToDispatch = {
            ...orderToUpdate,
            completed: true,
            completed_time: new Date().toISOString()
        }
        dispatch(updateDB(id, orderToDispatch));
   };
   const handleDelete = (id: string| null, orderToDelete: order) => {
       if(reason.length < 5) {
           setShow(true)
       } else {
        const orderData = {
            order: orderToDelete,
            deleted_at: new Date().toISOString(),
            reason
        }
        const orderToDispatch = {
            ...orderToDelete,
            deleted: true
        }
        dispatch(updateDB(id, orderToDispatch));
        dispatch(addDeletedOrderToDB(orderData))
        setReason('')
        setOpen(false)
       }
   }
   // const re1 = /(0?[1-9]|1[0-2]):[0-5][0-9]./
   const {order, minLapsed, secLapsed} = props
    return (
       <Card className={classes.card}>
           <CardContent className={classes.con}>
               <Box className={classes.box}>
                   <Typography align="center" variant="h6">Order Created:</Typography>
                   <section className={classes.section}>
                       <h2>{minLapsed} : {secLapsed}</h2>
                       <h2> minutes ago.</h2>
                   </section>
               </Box>
               <h4 className={classes.time}>{new Date(order.created_at).toLocaleDateString('en-GB')}</h4>
               <h4>Name: {order.name}</h4>
               <h4>Address: {order.address}</h4>
               <ul>
                   {order.orders && order.orders.map((item: orderDetails) => (
                       <h1 className={classes.items} key={item.id}>{checkQuantity(item.quantity, item.name)}</h1>
                   ))}
               </ul>
               <Typography variant="body1">
                   special instructions: {order.instruction}
               </Typography>
               <h2 className={classes.cost}>KES {order.total}</h2>
           </CardContent>
           <CardActions>
               <Button
               className={classes.markButton}
               onClick={() => handleUpdate(order.id, order) }
               variant="outlined">
                   Done <DoneIcon />
               </Button>
               <Button
               variant="outlined"
               className={classes.trashButton}
               onClick={handleOpen}
               >

                                  Trash <DeleteIcon />
                              </Button>
               <Dialog open={open} aria-labelledby="form-dialog-title">
                   <DialogContent>
                       <DialogContentText>Why are you deleting this order?</DialogContentText>
                       <TextField
                       placeholder="Add reason"
                       type="string"
                       multiline
                       fullWidth
                       variant="outlined"
                       rows={3}
                       value={reason}
                       onChange={(e) =>{setReason(e.target.value)}} />
                       <AlertMsg valid={show} msg="Please provide a valid reason" handleValid={handleValid} type="fail" />
                   </DialogContent>
                   <DialogActions>

                       <Button onClick={handleClose} variant="outlined" color="primary">Cancel</Button>
                       <Button onClick={() => handleDelete(order.id, order)} variant="outlined"  color="primary">Submit</Button>
                   </DialogActions>
               </Dialog>
           </CardActions>
<Box className={classes.box2}>
             <Chip className={classes.auxChip}
             onClick={() => {
               window.prompt('Copy and send this to the client!',`Thanks for eating at Vegan Basket! Here's your receipt: https://pos.vegan.garden/o/${order.id}`)
             }}
             label='Get Reciept'
             icon={<ReceiptIcon />} />
             <Chip className={classes.auxChip}
             label='whatsapp'
             onClick={()=>{
               window.open(`https://wa.me/${order.phoneNumber}`)
             }}/>
             <Chip className={classes.auxChip}
             label='text'
             onClick={()=>{

               window.open(`sms://+${order.phoneNumber}?body=Thanks for eating at Vegan Basket! Here is your receipt: https://pos.vegan.garden/o/${order.id}`)
             }}/>
             </Box>

       </Card>
    )
}

export default ColorCard
