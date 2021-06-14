import {AnyAction} from 'redux'

const orderReducers = (state = [], action: AnyAction) => {
    switch(action.type) {
        case 'FETCH_INCOMPLETE_ORDERS':
            return [...action.orderData]
        default:
            return state
    }
}

export default orderReducers