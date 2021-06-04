import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Grid, Paper, Typography, Card, CardContent, CardActions, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import {getMenufromDB} from '../actions/menu';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },

    action: {
        width: "100%",
        display: "flex",
    },

    button: {
        textTransform: "none",
        color: "#795548",
        backgroundColor: "#d3d3de"
    },

    price: {
        flexGrow: 1,
        marginLeft: "0.6rem"
    }
  });

const Menu = () => {
    const dispatch =useDispatch()
    const classes = useStyles();

    interface RootState {
        Menu: [{
            id: string | null,
            name: string,
            category: string,
            created_at: string,
            price: number
        }]
    }

    const menu = useSelector((state: RootState)=> state.Menu).filter(item => item.name !== '')

    useEffect(() =>{
        dispatch(getMenufromDB())
      }, [])

    return (
        <Grid spacing={2} container>
            <Grid item xs={8}>
                <Paper elevation={0}>
                    <Grid container spacing={2}>
                        {menu && menu.map(item => (
                            <Grid key={item.id} item xs={4}>
                                <Card className={classes.root} variant="outlined">
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {item.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={classes.action}>
                                        <Typography className={classes.price} variant="caption" component="p">KES {item.price}.00</Typography>
                                        <IconButton
                                        className={classes.button}>
                                        <AddIcon fontSize="small" />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Menu