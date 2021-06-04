import {Typography, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '../components/Menu'

const useStyles = makeStyles(() => ({
  grid: {
    width: "95%",
    margin: "0 auto"
  },
}))

export default function Home() {
  const classes = useStyles();
  return (
    <Box className={classes.grid}>
    <Typography variant="h5" gutterBottom>Vegan Basket</Typography>
    <Menu />
    </Box>
  )
}