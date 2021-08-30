import React from 'react';
import {Typography, Box, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import Image from 'next/image'
import logoX from '../public/vblogo1.png'

const useStyles = makeStyles(() => ({
  imagez: {
    width: "125px",
    height: "auto",
    position: "relative",
    margin: "25vw",
  },
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
    <>
    <Box className={classes.grid}>
    <br/>
    <h1>Hello there!</h1>
    <Typography variant="h3" gutterBottom>Site Under Construction</Typography>
    <Typography variant="h5" gutterBottom>The Vegan Garden Point of Sale system is currently under construction. We'll notify you if anything exciting happens 😉😁</Typography>
    <br/>
    <Link href="https://wa.me/+254777347328">
      <Button
        className={classes.button}>Order Through Whatsapp
      </Button>
    </Link>
    <br/>
    <br/>
<Image src={logoX} alt="vblogo" width={125} height={125} className={classes.imagez}   />
    </Box>

    </>
  )
}
