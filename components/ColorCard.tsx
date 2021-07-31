import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { Card, CardActions, CardContent, Button, Box, Typography, Dialog, DialogContent,  DialogContentText,
TextField, DialogActions} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { updateDB, addDeletedOrderToDB } from '../actions/orders';
import { checkQuantity, orderDetails, order } from '../utilities/utilities';
import {AlertMsg} from '../components/Alert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DoneIcon from '@material-ui/icons/Done';

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
    video: {
        display: "none"
    },
    con:{
      padding: "0.1rem",
    },
    time: {
      // position: "absolute",
      // top: "-1vh",
      // left: "2vw",
      fontSize: "1.25rem",
        [theme.breakpoints.down('sm')]:{
          fontSize: "1rem",
        }
    },
    phone: {
      display: "none",
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
      right: "2vw",
      color: "#412234",
      fontSize: "1.25rem",
        [theme.breakpoints.down('sm')]:{
          fontSize: "1rem",
        }
    },
    section: {
        // display: "flex",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        '& h4': {
            fontSize: "1rem",
            // margin: "0.3rem 0"
        },
        '& h4:first-child': {
            // marginRight: "0.3rem"
        },
        '& h2' : {
            // margin: "0 0.3rem"
        }
    },
    box:{
        backgroundColor: props => `${props.color}`,
        transition: "all 0.5s ease-in",
        width: "100%",
        margin: "0 auto",
        color: "#000",
        padding: "0.1rem",
        borderRadius: "10px"
    },
    trashButton : {
        backgroundColor: "#EF626C",
        color: "#fff",
        position: "relative",
        // right: "15vw",
        // bottom: "2vh",
        borderRadius: "20px",
        [theme.breakpoints.down('sm')] : {
            // right: "2vw",
            // bottom: "10vh",
        }
    },
    markButton: {
        backgroundColor: "#3581B8",
        color: "#fff",
        position: "relative",
        borderRadius: "20px",
        border: 0,
        // margin: "0 auto",
        // right: "2vw",
        // bottom: "2vh",
        fontSize: "1.25rem",
        width: "auto",
        height: "auto",
        [theme.breakpoints.down('sm')] : {
            fontSize: "1rem",
        }
    },
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
   const re1 = /(0?[1-9]|1[0-2]):[0-5][0-9]./
   const {order, minLapsed, secLapsed} = props
    return (
      <>
      <iframe className={classes.video} src="../audio/play.mp3" allow="autoplay" id="iframeAudio">
      </iframe>
       <Card className={classes.card}>
           <CardContent className={classes.con}>
               <Box className={classes.box}>
                   <Typography align="center" variant="h6">Order Created:</Typography>
                   <section className={classes.section}>
                       <h2>{minLapsed} : {secLapsed}</h2>
                       <h2> minutes ago.</h2>
                   </section>
               </Box>
               <h4>name: {order.name}</h4>
               <h4>id: {order.id}</h4>
               <ul>
                   {(order.orders).map((item: orderDetails) => (
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
                   <DoneIcon />
               </Button>
               <Button
               variant="outlined"
               className={classes.trashButton}
               onClick={handleOpen}
               >
                   <DeleteOutlineIcon />
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
       </Card>
       </>
    )
}

export default ColorCard
