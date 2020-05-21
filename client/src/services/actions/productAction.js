import { get_product_success, get_product_failed, get_product_loader } from '../types'
import { toast } from 'react-toastify'
import axios from 'axios'
import { productsURL } from '../../API/api'

export const getProduct = () => async dispatch => {
    try {
        dispatch({
            type: get_product_loader
        })
        const res = await axios.get(productsURL)
        if (res) {
            dispatch({
                type: get_product_success,
                payload: res.data.product
            })
        }
    } catch (err) {
        dispatch({
            type: get_product_failed
        })
        toast("Something went wrong")
    }
}