import React, {useState, useEffect} from 'react';
import ColorCard from './ColorCard';

const Order = (props: any) => {
    const [minLapsed, setMinLapsed] = useState(0)
    const [secLapsed, setSecLapsed] = useState(0)
    const [color, setColor] = useState(false)
    const {order} = props
   useEffect(() => {
       setInterval(() => {
        const newTime = new Date();
        const oldTime = new Date(order.created_at)
        const diff = newTime.getTime() - oldTime.getTime()
        const diffInMins = Math.floor(diff / (1000 * 60))
        const diffInSecs = Math.floor((diff % (1000 * 60)) / 1000)
        setMinLapsed(diffInMins)
        setSecLapsed(diffInSecs)
        const max_time = 20
        const red = Math.min(Math.floor(Math.abs(diff)/1000/60/max_time*255),255)
        const green = Math.max(Math.min(255-Math.floor(Math.abs(diff)/1000/60/max_time*255),255),0)
        const blue = Math.round(Math.min(255-(red+green)/2,0))
        const opac = Math.round(Math.min(0.1+(Math.abs(diff)/60/1000)/max_time/1.5,1) * 100) / 100

        const colorrgba = `rgba(${red}, ${green}, ${blue},${opac})`
        setColor(colorrgba)
      }, 1000)

    })

    return (
        <>
                <ColorCard
                order={order}
                minLapsed={minLapsed}
                secLapsed={secLapsed}
                color= {color}/>
        </>
    )
}

export default Order;
