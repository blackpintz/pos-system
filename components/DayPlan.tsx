import React from 'react';
import {Container, Typography, Button, Box, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {addTaskToDB} from '../actions/todos'

type formValues = {
    taskOne: string,
    taskTwo: string,
    taskThree: string,
    taskFour: string,
    taskFive: string,
    displayOne: string,
    displayTwo: string,
    displayThree: string,
    displayFour: string,
    displayFive: string
}

const useStyles = makeStyles(() => ({
    container: {
        padding: "0.5rem 2rem",
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
    },
    divider: {
        height: "3px",
        margin: "0.5rem 0"
    },
    title: {
        paddingLeft: "24px"
    }
  }))

const DayPlan = (props: any) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {register, handleSubmit, reset} = useForm<formValues>();
    const {day, title} = props

    const handlingData = (task: string, displayTime: string) => {
        if(task !== "") {
            const taskData = {
                task,
                completed: false,
                created_at: new Date().toISOString(),
                displayTime: displayTime === "" ? "10:00" : displayTime
            }
            dispatch(addTaskToDB(day, taskData))
        }
    }

    const onSubmit = (data: any) => {
        const {taskOne, taskTwo, taskThree, taskFour, taskFive, 
        displayOne, displayTwo, displayThree, displayFour, displayFive} = data
        handlingData(taskOne, displayOne);
        handlingData(taskTwo, displayTwo);
        handlingData(taskThree, displayThree);
        handlingData(taskFour, displayFour);
        handlingData(taskFive, displayFive);
        reset();
    }

    const InputBox = (props: any) => {
        const {label, num, display} = props
        return (
            <Box>
                <Box pl={3}>
                    <label>{num}</label>
                    <input {...register(label)} />
                    <input {...register(display)} type="time"  />
                </Box>

            </Box>


        )
    }

    return (
        <Container className={classes.container} maxWidth="sm">
             <Typography className={classes.title} variant="h6">{title}</Typography>
             <form onSubmit={handleSubmit(onSubmit)}>
                 <InputBox label="taskOne" num="1." display="displayOne" />
                 <InputBox label="taskTwo" num="2." display="displayTwo" />
                 <InputBox label="taskThree" num="3." display="displayThree" />
                 <InputBox label="taskFour" num="4." display="displayFour" />
                 <InputBox label="taskFive" num="5." display="displayFive" />
                 <Box display="flex" justifyContent="flex-end" width="84%">
                  <Button className={classes.button} variant="contained" color="secondary" type="submit">Add</Button>
                 </Box>
             </form>
             <Divider className={classes.divider} />
        </Container>
    )
}

export default DayPlan;