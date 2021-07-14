import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box} from '@material-ui/core';
import moment from 'moment';
import { fetchCompleteTasksFromDB } from '../actions/todos';
import { Task } from '../utilities/utilities';
import CompletedTodo from '../components/CompletedTodo';

const CompletedTodos = () => {
    const dispatch =useDispatch();
    interface RootState {
        Todos: [Task]
    }

    const tasks = useSelector((state: RootState)=> state.Todos).filter(item => item.id !== '');

    useEffect(() => {
        dispatch(fetchCompleteTasksFromDB(moment().format('dddd')))
    },[])
    return (
        <Box width="80%" m="1rem">
           {tasks.map((task: Task) => (
               <CompletedTodo taskItem={task} key={task.id} />
           ))}
        </Box>
    )
}

export default CompletedTodos;