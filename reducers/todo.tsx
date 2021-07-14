import {AnyAction} from 'redux';

const todoReducers = (state = [], action: AnyAction) => {
    switch(action.type) {
        case 'FETCH_DATE':
            return action.date
        case 'FETCH_TASK_DATA':
            return [...action.taskData]
        case 'FETCH_COMPLETE_TASKS':
            return [...action.taskData]
        default:
            return state
    }
}

export default todoReducers;