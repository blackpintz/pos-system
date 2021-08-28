import { useRouter } from 'next/router'
import React, { useEffect} from 'react';
import {fetchOrderByID } from '../../actions/orders';
import {order} from '../../utilities/utilities';
import {useDispatch, useSelector} from 'react-redux';

import {Card, CardContent, CardActions, Grid, Typography, Chip, Box} from '@material-ui/core';

const Post = () => {
  const router = useRouter()
  const dispatch =useDispatch();
  const { slug } = router.query
  useEffect(() => {
      dispatch(fetchOrderByID(slug));
  }, [])
  interface RootState {
      Orders: [order]
  }
  const ordersx = useSelector((state: RootState)=> state.Orders)
  console.log(ordersx.id)
  return<> <p>Order ID: {slug}</p>
  <p>{ordersx}</p></>
}

export default Post
