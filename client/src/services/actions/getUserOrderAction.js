import { get_user_order_success, get_user_order_failed } from '../types'
import { setAuthToken } from '../../utils/setAuthToken'


import axios from 'axios'
import { userOrderURL } from '../../API/api'

export const getUserOrder = () => async dispatch => {


    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get(userOrderURL)
        dispatch({
            type: get_user_order_success,
            payload: res.data[0].orders
        })
        
    } catch (err) {
        dispatch({
            type: get_user_order_failed
        })
    }
}