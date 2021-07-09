import {AnyAction} from 'redux';

const todoReducers = (state = [], action: AnyAction) => {
    switch(action.type) {
        case 'FETCH_DATE':
            return action.date
        default:
            return state
    }
}

export default todoReducers;