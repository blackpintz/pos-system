import React from 'react';
import {Typography, Box, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
// import Image from 'next/image'

const useStyles = makeStyles(() => ({
  grid: {
    width: "95%",
    margin: "0 auto",
    padding: "1rem",
    textAlign: "center"
  },
  button: {
    backgroundColor: "gray"
  }
}))



export default function Home() {
  const classes = useStyles();
  return (
    <Box className={classes.grid}>
    <br/>
    <Link href="https://wa.me/+254777347328">
      <Button
        className={classes.button}>Order Through Whatsapp
      </Button>
    </Link>
    <Typography variant="h3" gutterBottom>Site Under Construction</Typography>
    <Typography variant="h5" gutterBottom>The Vegan Garden Point of Sale system is currently under construction. We'll notify you if anything exciting happens 😉😁</Typography>
    </Box>
  )
}
