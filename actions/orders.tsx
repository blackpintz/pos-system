import database from '../firebase/firebase';
import {order, deletedOrder, deletedOrderNoID} from '../utilities/utilities'
// import moment from 'moment';

interface orderNoID {
    orders: any[],
    phoneNumber: string,
    total: number,
    created_at: string,
    completed: boolean,
    completed_time: string,
    paid: boolean,
    name: string,
    instruction: string,
    deleted: boolean
}

const initial = {
    id: '',
    orders: [],
    phoneNumber: '',
    total: 0,
    created_at: "",
    completed: false,
    completed_time: "",
    paid: false,
    name: "",
    instruction: "",
    deleted: false
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

const fetchAllOrders = (orderData: [order]) => ({
    type: "FETCH_ALL_ORDERS",
    orderData
})

export const fetchAllOrdersFromDB = () => (
    (dispatch: any) => (
        database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [order] = [initial]
            snapshot.forEach((childSnapshot) => {
                Orders.push({
                    id:childSnapshot.key,
                    ...childSnapshot.val()
                })
                dispatch(fetchAllOrders(Orders))
            })
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
            const Orders: [order] = [initial]
            snapshot.forEach((childSnapshot) => {
                if(!childSnapshot.val().completed && !childSnapshot.val().deleted) {
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
            const Orders: [order] = [initial]
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

const fetchOrderByID = (id: string | string[], item: order) => ({
    type: 'FETCH_ORDER_BY_ID',
    id,
    item
})

export const fetchOrderByIDFromDB= (slug: string | string[]) => (
    (dispatch: any)=>(
        database.ref(`VeganOrders/${slug}`).on('value', (snapshot) => {
           dispatch(fetchOrderByID(slug, snapshot.val())) 
        })
    )
)


export const fetchCompleteOrdersFromDBLastMonth = () => (
    (dispatch: any) => {
        return database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [order] = [initial]
            var d = new Date();
            // d.setDate(1)
            d.setDate(1);
            d.setMonth(d.getMonth()-1)
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().completed && (new Date(childSnapshot.val().created_at) > d)) {
                  console.log()
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
export const fetchCompleteOrdersFromDBMonth = () => (
    (dispatch: any) => {
        return database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [order] = [initial]
            var d = new Date();
            d.setDate(1)
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().completed && (new Date(childSnapshot.val().created_at) > d)) {
                  console.log()
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



export const fetchCompleteOrdersFromDBDay = () => (
    (dispatch: any) => {
        return database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [order] = [initial]
            var d = new Date();
            d.setDate(d.getDate() - 1)
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().completed && (new Date(childSnapshot.val().created_at) > d)) {
                  console.log()
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
export const fetchCompleteOrdersFromDB12 = () => (
    (dispatch: any) => {
        return database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [order] = [initial]
            var d = new Date();
            // d.setDate(d.getHour() - 12)
            d.setHours(0,0,0,0);
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().completed && (new Date(childSnapshot.val().created_at) > d)) {
                  console.log()
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
export const fetchCompleteOrdersFromDBWeek = () => (
    (dispatch: any) => {
        return database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [order] = [initial]
            var d = new Date();
            d.setDate(d.getDate() - 7)
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().completed && (new Date(childSnapshot.val().created_at) > d)) {
                  console.log()
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

const fetchCompleteOrdersByTime = (orderData: [order]) => ({
    type: "FETCH_COMPLETE_ORDERS_BY_TIME",
    orderData
})

export const fetchCompleteOrdersByTimeFromDB = () => (
    (dispatch: any) => (
        database.ref('VeganOrders').on('value', (snapshot) => {
            const Orders: [order] = [initial]
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().completed) {
                    Orders.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                }
                dispatch(fetchCompleteOrdersByTime(Orders))
            })
        })
    )
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
            const Orders: [order] = [initial]
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
    type: "REMOVE_KITCHEN_ORDER",
    id
})

export const deleteKitchenOrderFromDB = (id: string | null) => (
    (dispatch: any) => (
        database.ref(`VeganOrders/${id}`).remove().then(() => {
            dispatch(deleteKitchenOrder(id))
        })
    )
)

const deleteTrashOrder = (id: string | null) => ({
    type: "REMOVE_TRASH_ORDER",
    id
})

export const deleteTrashOrderFromDB = (id: string | null) => (
    (dispatch: any) => (
        database.ref(`VeganTrash/${id}`).remove().then(() => {
            dispatch(deleteTrashOrder(id))
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

const fetchDeleteOrders = (orderData: [deletedOrder]) => ({
    type: 'FETCH_DELETED_ORDERS',
    orderData
})

export const fetchDeletedOrdersFromDB = () => (
    (dispatch: any) => (
        database.ref('VeganTrash').on('value', (snapshot) => {
            const Orders: [deletedOrder] = [
                {
                    id: '',
                    order: initial,
                    deleted_at: '',
                    reason: ''
                }
            ]
            snapshot.forEach((childSnapshot) => {
                Orders.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
                dispatch(fetchDeleteOrders(Orders))
            })
        })
    )
)
