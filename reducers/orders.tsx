import {AnyAction} from 'redux'

interface order {
    id: string | null,
    orders: any[],
    phoneNumber: string,
    total: number,
    created_at: string,
    completed: boolean,
    completed_time: string
}

const orderReducers = (state = [], action: AnyAction) => {
    switch(action.type) {
        case 'FETCH_INCOMPLETE_ORDERS':
            return [...action.orderData]
        case 'FETCH_COMPLETE_ORDERS':
            return [...action.orderData]
        case 'FETCH_PAID_ORDERS':
            return [...action.orderData]
        case 'UPDATE_ORDER':
            return state.map((order: order) => {
                if(order.id === action.id) {
                    return {
                        ...order,
                        ...action.updates
                    }
                }
                return order
            })
        default:
            return state
    }
}

export default orderReducers