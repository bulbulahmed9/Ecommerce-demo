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
import { orderURL } from '../../API/api'
import { toast } from 'react-toastify'
import axios from 'axios'
import {setAuthToken} from '../../utils/setAuthToken'

export const addCart = (product) => dispatch => {
    dispatch({
        type: add_cart,
        payload: product
    })
}


export const removeCart = (product) => dispatch => {
    dispatch({
        type: remove_cart,
        payload: product
    })
}

export const incrementCart = (product) => dispatch => {
    dispatch({
        type: increment_cart,
        payload: product
    })
}


export const decrementCart = (product) => dispatch => {
    dispatch({
        type: decrement_cart,
        payload: product
    })
}

export const clearCart = () => dispatch => {
    dispatch({
        type: clear_cart
    })
}

export const checkout = (cartItem) => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let userOrder = cartItem.map(item => {
        let newObj = {
            name: item.info.name,
            quantity: item.quantity,
            price: item.info.price
        }
        return newObj
    })

    let body = JSON.stringify(userOrder)
    console.log(body)

    try {
        dispatch({
            type: checkout_loader
        })
        const res = await axios.post(orderURL, body, config);
        if (res.status === 201) {
            dispatch({
                type: checkout_success
            });
            toast(res.data.msg)
        }
        console.log(res)
        dispatch({
            type: checkout_loader_stop
        })
    } catch (err) {
        dispatch({
            type: checkout_failed
        })
    }
}