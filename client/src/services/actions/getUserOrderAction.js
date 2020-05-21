import {get_user_order_success, get_user_order_failed} from '../types'


import axios from 'axios'
import { userOrderURL } from '../../API/api'

export const getUserOrder = () => async dispatch => {
    try {
        const res = await axios.get(userOrderURL)
        dispatch({
            type: get_user_order_success,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: get_user_order_failed
        })
    }
}