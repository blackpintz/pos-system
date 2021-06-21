import database from '../firebase/firebase'

interface order {
    orders: any[],
    phoneNumber: string,
    total: number,
    created_at: string,
    completed: boolean,
    completed_time: string,
    paid: boolean
}

interface orderWithID {
    id: string | null,
    orders: any[],
    phoneNumber: string,
    total: number,
    created_at: string,
    completed: boolean,
    completed_time: string,
    paid: boolean
}


const addOrderItem = (item: orderWithID ) => ({
    type: "ADD_ORDER",
    item
})

export const addOrderItemToDB = (itemData: order) => (
    (dispatch: any) => (
        database.ref('VeganOrders').push(itemData).then((ref) => {
            dispatch(addOrderItem({
                id: ref.key,
                ...itemData
            }))
        })
    )
)

const fetchIncompleteOrderItems = (orderData: [orderWithID]) => ({
    type: "FETCH_INCOMPLETE_ORDERS",
    orderData
})

export const fetchIncompleteOrdersFromDB = () => (
    (dispatch: any) => {
        return database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [orderWithID] = [
                {
                    id: '', 
                    orders: [], 
                    phoneNumber: '', 
                    total: 0, 
                    created_at: "",
                    completed: false,
                    completed_time: "",
                    paid: false
                }
            ]

            snapshot.forEach((childSnapshot) => {
                if(!childSnapshot.val().completed) {
                    Orders.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                }
                dispatch(fetchIncompleteOrderItems(Orders))
            })
        })
    }
)

const fetchCompleteOrderItems = (orderData: [orderWithID]) => ({
    type: "FETCH_INCOMPLETE_ORDERS",
    orderData
})

export const fetchCompleteOrdersFromDB = () => (
    (dispatch: any) => {
        return database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [orderWithID] = [
                {
                    id: '', 
                    orders: [], 
                    phoneNumber: '', 
                    total: 0, 
                    created_at: "",
                    completed: false,
                    completed_time: "",
                    paid: false
                }
            ]
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().completed) {
                    Orders.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                }
                dispatch(fetchCompleteOrderItems(Orders))
            })
        })
    }
)

const updateOrder = (id: string | null, updates: orderWithID) => ({
    type: "UPDATE_ORDER",
    id,
    updates
})

export const updateDB = (id: string | null, updates: orderWithID) => (
    (dispatch: any) => (
        database.ref(`VeganOrders/${id}`).update(updates).then(() => {
            dispatch(updateOrder(id, updates))
        })
    )
)

const fetchPaidOrders = (orderData: [orderWithID]) => ({
    type: "FETCH_PAID_ORDERS",
    orderData
})

export const fetchPaidOrdersFromDB = () => (
    (dispatch: any) => (
        database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [orderWithID] = [
                {
                    id: '', 
                    orders: [], 
                    phoneNumber: '', 
                    total: 0, 
                    created_at: "",
                    completed: false,
                    completed_time: "",
                    paid: false
                }
            ]
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().paid) {
                    Orders.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                }
                dispatch(fetchPaidOrders(Orders))
            })
        })
    )
)