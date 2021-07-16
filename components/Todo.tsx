 import { useEffect, useState } from 'react';
 import {useDispatch} from 'react-redux';
 import {Typography, Box, Button} from '@material-ui/core';
 import { makeStyles } from '@material-ui/core/styles';
 import moment from 'moment';
 import { updateTaskToDB } from '../actions/todos';
 import { Task } from '../utilities/utilities';

 const useStyles = makeStyles(() => ({
     button: {
         borderRadius: "20px",
         marginLeft: "0.5rem",
         backgroundColor: "#009688"
     },
     video: {
         display: "none"
     }
  }))

 const Todo = ({taskItem}: any) => {
    const classes = useStyles();
    const dispatch =useDispatch();
    const {task, displayTime, id, day} = taskItem
    const [show, setShow] = useState(false)
  
     useEffect(() => {
         setInterval(() => {
            const time = moment(displayTime, ["h:mm A"]).format("HH:mm")
            const now = moment().format("HH:mm")
            if(now >= time) setShow(true)
         },1000)
     }, [])


     const handleUpdate = (child: string, id: string | null, todo: Task) => {
         const updatedTodo = {
             ...todo,
             completed: true,
             completed_at: new Date().toISOString()
         }
         dispatch(updateTaskToDB(child, id, updatedTodo))
     }

     return (
         <>
         {show ? (
             <>
             <Box display="flex" my={2}>
                 <Typography variant="h6">{task}</Typography>
                 <Button  
                 variant="contained" 
                 size="small"
                 className={classes.button}
                 onClick={() => handleUpdate(day,id, taskItem)}>Mark complete</Button>
             </Box>
             <iframe className={classes.video} src="audio/play.mp3" allow="autoplay" id="iframeAudio">
             </iframe> 
             </>
         ) : (
             <></>
         )}
         </>
     )
 }

 export default Todo;