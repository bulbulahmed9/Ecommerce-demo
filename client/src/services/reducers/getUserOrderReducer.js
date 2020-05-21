import { get_user_order_success, get_user_order_failed } from '../types'

const initialState = {
    order: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case get_user_order_success:
            return {
                ...state,
                order: action.payload
            }
        case get_user_order_failed:
            return {
                ...state,
                order: []
            }
        default:
            return state;
    }
}