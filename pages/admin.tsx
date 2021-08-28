import React from 'react';
import {Typography, Box, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'

const useStyles = makeStyles(() => ({
  grid: {
    width: "95%",
    margin: "0 auto"
  },
  button: {
    margin: "0.1rem",
    padding: "0.25rem",
  }
}))

const data =[

            {"href":"/complete/12","title":"Daily Account View"},
            {"href":"/complete/week","title":"Weekly Account View"},
            {"href":"/complete/month","title":"Monthly Accounting View"},
            {"href":"/complete/lastmonth","title":"Last Months Accounting"},
            // {"href":"/complete/quarter","title":"Quarterly Accounting"},
            {"href":"/","title":"Home"},
            {"href":"/menu","title":"Menu"},
            {"href":"/kitchen","title":"Kitchen"},
            {"href":"/complete","title":"Complete"},
            {"href":"/paid","title":"Paid"},
            {"href":"/orders-deleted","title":"Deleted"},


        ];

export default function Home() {
  const classes = useStyles();
  return (
    <Box className={classes.grid}>
    <Typography variant="h5" gutterBottom>Vegan Basket</Typography>
      {data.map(function(d){
         return (
           <Link href={d.href}>
             <Button className={classes.button} variant="outlined" color="primary">{d.title}</Button>
           </Link>
         )})}
    </Box>
  )
}
