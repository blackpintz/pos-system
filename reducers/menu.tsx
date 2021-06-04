import {AnyAction} from 'redux'

const menuReducers = (state = [], action: AnyAction) => {
    switch(action.type) {
        case 'ADD_ITEM' :
            return [...state, action.item]
        case 'FETCH_MENU' :
            return [...action.menu]
        default:
            return state
    }
}

export default menuReducers