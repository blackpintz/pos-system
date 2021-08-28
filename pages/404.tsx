import Link from 'next/link'
import {Button, Box} from '@material-ui/core'
import styles from '../styles/404.module.css'

 const Custom404 = () => {
     return (
    <Box
    width="50%"
    mx="auto"
    className = {styles.page}>
    <h1>404 | Page Not Found.</h1>
    <Link href="/">
        <Button variant="outlined" color="primary">Go home</Button>
      </Link>
    </Box>
)}

export default Custom404
