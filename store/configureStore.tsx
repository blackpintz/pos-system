import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import menuReducers from '../reducers/menu'


const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Menu: menuReducers
        }),
        composeWithDevTools(applyMiddleware(thunk))
    )
    return store
}

export default ConfigureStore