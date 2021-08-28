import React from 'react';
import {Typography, Box, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'

const useStyles = makeStyles(() => ({
  grid: {
    width: "95%",
    margin: "0 auto"
  },
}))

const data =[

            {"href":"/","title":"Home"},
            {"href":"/menu","title":"Menu"},
            {"href":"/kitchen","title":"Kitchen"},

        ];

export default function Home() {
  const classes = useStyles();
  return (
    <Box className={classes.grid}>
    <Typography variant="h5" gutterBottom>Vegan Basket</Typography>
      {data.map(function(d){
         return (
           <Link href={d.href}>
             <Button variant="outlined" color="primary">{d.title}</Button>
           </Link>
         )})}
    </Box>
  )
}
