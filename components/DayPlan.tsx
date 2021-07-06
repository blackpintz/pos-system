import React from 'react';
import {Container, Typography, Button, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

type formValues = {
    taskOne: string,
    taskTwo: string,
    taskThree: string,
    taskFour: string,
    taskFive: string
}

const useStyles = makeStyles(() => ({
    container: {
        padding: "2rem",
        backgroundColor: "#fff",
        color: "#808080",
        "& input" : {
            width: "80%",
            marginLeft: "0.4rem",
            borderWidth: "0 0 0.01rem",
            padding: "0.8rem"
        },
        "& label": {
            fontSize: "1rem",
            position: "relative",
            top: "1rem"
        }
    },
    button: {
        marginTop: "1rem",
        width: "20%"
    }
  }))

const DayPlan = () => {
    const classes = useStyles();
    const {register, handleSubmit, reset} = useForm<formValues>();

    const onSubmit = (data: any) => {
        console.log(data);
        reset();
    }

    return (
        <Container className={classes.container} maxWidth="sm">
             <Typography variant="h6">Monday</Typography>
             <form onSubmit={handleSubmit(onSubmit)}>
                 <Box>
                    <label>1.</label>
                    <input {...register("taskOne")} />
                 </Box>
                 <Box>
                    <label>2.</label>
                    <input {...register("taskTwo")} />
                 </Box>
                 <Box>
                     <label>3.</label>
                     <input {...register("taskThree")} />
                 </Box>
                 <Box>
                     <label>4.</label>
                     <input {...register("taskFour")} />
                 </Box>
                 <Box>
                     <label>5.</label>
                     <input {...register("taskFive")} />
                 </Box>
                 <Box display="flex" justifyContent="flex-end" width="84%">
                  <Button className={classes.button} variant="contained" color="secondary" type="submit">Add</Button>
                 </Box>
             </form>
        </Container>
    )
}

export default DayPlan;