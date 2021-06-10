import database from '../firebase/firebase'

interface order {
    orders: any[],
    phoneNumber: string,
    total: number,
    created_at: string,
    completed: boolean,
    completed_time: string
}

// interface orderItem {
//     id: string,
//     name: string,
//     price: number,
//     quantity: number
// }


const addOrderItem = (item: {
    id: string | null,
    orders: any[],
    phoneNumber: string,
    total: number,
    created_at: string,
    completed: boolean,
    completed_time: string
} ) => ({
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