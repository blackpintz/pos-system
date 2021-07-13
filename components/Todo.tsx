 const Todo = ({taskItem}: any) => {
     const {task, id} = taskItem
     return (
         <>
            <h2>{task}</h2>
         </>
     )
 }

 export default Todo;