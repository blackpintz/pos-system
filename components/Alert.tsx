import React from 'react';
import {Box, Collapse, IconButton} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';


export const AlertMsg = (props: any) => {
    const {msg, valid, handleValid, type} = props
    return (
        <>
        <Box mt={1} mb={1}>
            <Collapse in={valid}>
                <Alert
                variant={type ==="pass" ? "filled" : "standard"}
                severity={type ==="fail" ? "error" : "success"}
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleValid}>
                        <CloseIcon />
                    </IconButton>
                }
                >
                    {msg}
                </Alert>
            </Collapse>
        </Box>
        </>
    )
}





