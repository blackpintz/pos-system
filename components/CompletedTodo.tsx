
import moment from 'moment';
import {Typography, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    caption: {
        position: "relative",
        top: "0.6rem",
        marginLeft: "0.8rem"
    }
 }))


const CompletedTodo = ({taskItem}: any) => {
    const classes = useStyles();
    const {task, completed_at} = taskItem
    return (
        <Box display="flex">
            <Typography variant="h6">{task}</Typography>
            <Typography 
            variant="caption" 
            color="textSecondary"
            className={classes.caption}>
                completed on {moment(completed_at).format('LLL')}
            </Typography>
        </Box>
    )
}

export default CompletedTodo;