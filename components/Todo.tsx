 import { useEffect, useState } from 'react';
 import moment from 'moment';
 const Todo = ({taskItem}: any) => {
     const {task, displayTime} = taskItem
     const [show, setShow] = useState(false)
  
     useEffect(() => {
         setInterval(() => {
            const time = moment(displayTime, ["h:mm A"]).format("HH:mm")
            const now = moment().format("HH:mm")
            if(now >= time) setShow(true)
         },1000)
     })
     return (
         <>
         {show ? (
             <h2>{task}</h2>
         ) : (
             <></>
         )}
         </>
     )
 }

 export default Todo;