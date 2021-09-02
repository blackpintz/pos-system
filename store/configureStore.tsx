import {createStore, applyMiddleware, combineReducers} from 'redux';
import { useMemo } from 'react';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {persistReducer} from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import menuReducers from '../reducers/menu';
import orderReducers from '../reducers/orders';
import todoReducers from '../reducers/todo';

let store: any;

const initialState = {
    Menu: [],
    Orders: [],
    Todos: []
}

const rootReducers =  combineReducers({
    Menu: menuReducers,
    Orders: orderReducers,
    Todos: todoReducers
})

const createNoopStorage = () => {
    return {
      getItem(_key: any) {
        return Promise.resolve(null);
      },
      setItem(_key: any, value: any) {
        return Promise.resolve(value);
      },
      removeItem(_key: any) {
        return Promise.resolve();
      },
    };
  };

  const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['Orders']
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

const ConfigureStore = (initial:any=initialState) => {
    return createStore(
        persistedReducer,
        initial, 
        composeWithDevTools(applyMiddleware(thunk))
    )
   
}

export const initializeStore = (preloadState: any) => {
    let _store = store ?? ConfigureStore(preloadState)

    if(preloadState && store) {
        _store = ConfigureStore({...store.getState(), ...preloadState})

        store = undefined;
    }

    if(typeof window === 'undefined') return _store
    if(!store) store = _store

    return _store
}

export function useStore(initialState:any) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}

export default ConfigureStore