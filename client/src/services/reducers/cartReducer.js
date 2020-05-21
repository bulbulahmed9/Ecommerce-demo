import {
    add_cart,
    remove_cart,
    clear_cart,
    increment_cart,
    decrement_cart,
    checkout_success,
    checkout_failed,
    checkout_loader,
    checkout_loader_stop
} from '../types'

import { toast } from 'react-toastify'

const initialState = {
    loading: false,
    cart: []
}

export default function (state = initialState, action) {

    const { payload } = action

    let updatedCart;
    let updatedItemIndex;

    switch (action.type) {
        case add_cart:
            updatedCart = [...state.cart]
            updatedItemIndex = updatedCart.findIndex(item => item._id === payload._id)
            // if item not found in cart
            if (updatedItemIndex < 0) {
                updatedCart.push({ ...payload, quantity: 1 })
            } else {
                // else set a alert
                toast("Product already in cart")
            }
            return {
                ...state,
                cart: updatedCart
            }

        case remove_cart:
            updatedCart = [...state.cart]
            updatedItemIndex = updatedCart.findIndex(item => item._id === payload._id)
            updatedCart.splice(updatedItemIndex, 1)
            return {
                ...state,
                cart: updatedCart
            }
        case clear_cart:
            return {
                ...state,
                cart: []
            }
        case increment_cart:

            updatedCart = [...state.cart]
            updatedItemIndex = updatedCart.findIndex(item => item._id === payload._id)

            let incrementedItem = {
                ...updatedCart[updatedItemIndex]
            }
            incrementedItem.quantity = incrementedItem.quantity + 1
            updatedCart[updatedItemIndex] = incrementedItem

            return {
                ...state,
                cart: updatedCart
            }

        case decrement_cart:
            updatedCart = [...state.cart]
            updatedItemIndex = updatedCart.findIndex(item => item._id === payload._id)

            let decrementedItem = {
                ...updatedCart[updatedItemIndex]
            }
            if (decrementedItem.quantity === 1) {
                decrementedItem.quantity = 1
            }
            else {
                decrementedItem.quantity = decrementedItem.quantity - 1
            }

            updatedCart[updatedItemIndex] = decrementedItem
            return {
                ...state,
                cart: updatedCart
            }

        case checkout_loader:
            return {
                ...state,
                loading: true,
            }
        case checkout_loader_stop:
            return {
                ...state,
                loading: false
            }
        case checkout_success:
            return {
                ...state,
                loading: false,
                cart: []
            }
        case checkout_failed:
            return {
                loading: false,
                ...state,
            }
        default:
            return state
    }
}