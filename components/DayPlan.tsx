import React from 'react';
import {Container, Typography, TextField, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        padding: "2rem",
        backgroundColor: "#fff",
        color: "#808080"
    },

    textField: {
        width: "80%",
        marginLeft: "0.4rem"
    },
    li: {
        marginTop: "1.1rem"
    }
  }))

const DayPlan = () => {
    const classes = useStyles();
    return (
        <Container className={classes.container} maxWidth="sm">
             <Typography variant="h6">Monday</Typography>
             <form>
                 <Box display="flex">
                     <p className={classes.li}>1.</p>
                     <TextField
                     className={classes.textField} />
                 </Box>
                 <Box display="flex">
                     <p className={classes.li}>2.</p>
                     <TextField 
                     className={classes.textField}/>
                 </Box>
             </form>
        </Container>
    )
}

export default DayPlan;