import { get_product_success, get_product_failed, get_product_loader } from '../types'

const initialState = {
    loading: false,
    products: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case get_product_loader:
            return {
                ...state,
                loading: true
            }
        case get_product_success:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case get_product_failed:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}