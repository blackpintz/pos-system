import database from '../firebase/firebase';
import {order, deletedOrder, deletedOrderNoID} from '../utilities/utilities'

interface orderNoID {
    orders: any[],
    phoneNumber: string,
    total: number,
    created_at: string,
    completed: boolean,
    completed_time: string,
    paid: boolean,
    name: string,
    instruction: string
}


const addOrderItem = (item: order ) => ({
    type: "ADD_ORDER",
    item
})

export const addOrderItemToDB = (itemData: orderNoID) => (
    (dispatch: any) => (
        database.ref('VeganOrders').push(itemData).then((ref) => {
            dispatch(addOrderItem({
                id: ref.key,
                ...itemData
            }))
        })
    )
)

const fetchIncompleteOrderItems = (orderData: [order]) => ({
    type: "FETCH_INCOMPLETE_ORDERS",
    orderData
})

export const fetchIncompleteOrdersFromDB = () => (
    (dispatch: any) => {
        return database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [order] = [
                {
                    id: '', 
                    orders: [], 
                    phoneNumber: '', 
                    total: 0, 
                    created_at: "",
                    completed: false,
                    completed_time: "",
                    paid: false,
                    name: "",
                    instruction: ""
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

const fetchCompleteOrderItems = (orderData: [order]) => ({
    type: "FETCH_INCOMPLETE_ORDERS",
    orderData
})

export const fetchCompleteOrdersFromDB = () => (
    (dispatch: any) => {
        return database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [order] = [
                {
                    id: '', 
                    orders: [], 
                    phoneNumber: '', 
                    total: 0, 
                    created_at: "",
                    completed: false,
                    completed_time: "",
                    paid: false,
                    name: "",
                    instruction: ""
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

const updateOrder = (id: string | null, updates: order) => ({
    type: "UPDATE_ORDER",
    id,
    updates
})

export const updateDB = (id: string | null, updates: order) => (
    (dispatch: any) => (
        database.ref(`VeganOrders/${id}`).update(updates).then(() => {
            dispatch(updateOrder(id, updates))
        })
    )
)

const fetchPaidOrders = (orderData: [order]) => ({
    type: "FETCH_PAID_ORDERS",
    orderData
})

export const fetchPaidOrdersFromDB = () => (
    (dispatch: any) => (
        database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [order] = [
                {
                    id: '', 
                    orders: [], 
                    phoneNumber: '', 
                    total: 0, 
                    created_at: "",
                    completed: false,
                    completed_time: "",
                    paid: false,
                    name: "",
                    instruction: ""
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

const deleteKitchenOrder = (id: string | null) => ({
    type: "REMOVE_ORDER",
    id
})

export const deleteKitchenOrderFromDB = (id: string | null) => (
    (dispatch: any) => (
        database.ref(`VeganOrders/${id}`).remove().then(() => {
            dispatch(deleteKitchenOrder(id))
        })
    )
)

const addDeletedOrderToTrash = (item: deletedOrder) => ({
    type: "ADD_ORDER_TO_TRASH",
    item
})

export const addDeletedOrderToDB = (itemData: deletedOrderNoID) => (
    (dispatch: any) => (
        database.ref('VeganTrash').push(itemData).then((ref) => {
            dispatch(addDeletedOrderToTrash({
                id: ref.key,
                ...itemData
            }))
        })
    )
)
