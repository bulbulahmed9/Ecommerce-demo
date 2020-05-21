import React from 'react'
import demo from '../../shared/img/demo.svg'
import './singleProduct.css'

import {addCart} from '../../services/actions/cartAction'
import {connect} from 'react-redux'

const SingleProduct = ({ product, addCart, isCart }) => {

    const {name, price, quantity} = product.info

    return (
        <>
            <div className="product-box col-md-3">
                <p className={isCart ? 'orange-color love': 'orange'}><i className="far fa-heart"></i></p>
                <img src={demo} className="img-fluid" alt="img" />
                <div className="info">
                    <div>
                        <p className="product-name"> {name} </p>
                        <small>Quantity {quantity} </small>
                        <p className="price">${price}.00</p>
                    </div>
                    <button className={isCart ? 'orange-bg' : null} onClick={() =>{ addCart(product)
                     }}>
                        <i className="fas fa-cart-arrow-down"></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default connect(null, {addCart})(SingleProduct)
