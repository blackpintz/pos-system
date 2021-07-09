import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import menuReducers from '../reducers/menu';
import orderReducers from '../reducers/orders';
import todoReducers from '../reducers/todo';


const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Menu: menuReducers,
            Orders: orderReducers,
            Todos: todoReducers
        }),
        composeWithDevTools(applyMiddleware(thunk))
    )
    return store
}

export default ConfigureStore