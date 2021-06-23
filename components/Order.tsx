import React, {useState, useEffect} from 'react';
import ColorCard from './ColorCard';

const Order = (props: any) => {
    const [minLapsed, setMinLapsed] = useState(0)
    const [secLapsed, setSecLapsed] = useState(0)
    const [greenCard, setGreenCard] = useState(true)
    const [yellowCard, setYellowCard] = useState(false)
    const [orangeCard, setOrangeCard] = useState(false)
    const [redCard, setRedCard] = useState(false)

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
       }, 1000)
       if(minLapsed >= 7) {
           setGreenCard(false)
           setYellowCard(true)
       }

       if(minLapsed >= 10) {
        setYellowCard(false)
        setOrangeCard(true)
       }

       if(minLapsed >= 20) {
           setOrangeCard(false)
           setRedCard(true)
       }
    })

    return (
        <>
        {greenCard ? (
                <ColorCard 
                order={order}
                minLapsed={minLapsed}
                secLapsed={secLapsed}
                color= "#4caf50" />
        ) : (
            <></>
        )}
        {yellowCard ? (
                <ColorCard 
                order={order}
                minLapsed={minLapsed}
                secLapsed={secLapsed}
                color= "#ffeb3b"/>
        ) : (
            <></>
        )}
        {orangeCard ? (
                <ColorCard 
                order={order}
                minLapsed={minLapsed}
                secLapsed={secLapsed}
                color= "#ff9800"/>
        ) : (
            <></>
        )}

        {redCard ? (
                <ColorCard 
                order={order}
                minLapsed={minLapsed}
                secLapsed={secLapsed}
                color= "#f44336"/>
        ) : (
            <></>
        )}
        </>
    )
}

export default Order;
