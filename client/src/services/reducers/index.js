import { combineReducers } from 'redux'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import getUserOrderReducer from './getUserOrderReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','cart']
}

const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    profileReducer,
    cart: cartReducer,
    userOrder: getUserOrderReducer
})

export default persistReducer(persistConfig, rootReducer)