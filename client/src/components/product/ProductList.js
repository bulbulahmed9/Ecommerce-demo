import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SingleProduct from './SingleProduct'

const ProductList = ({ products, carts }) => {
    return (
        <>
            <div className="row">
                {products.products !== null && products.products.map((product) => {
                    let isCart = false;
                    let res = carts.find(item => item._id === product._id)
                    if(res){
                        isCart = true;
                    }
                    return <SingleProduct isCart={isCart} product={product} key={product._id} />
                }) 
                }
            </div>
        </>
    )
}

ProductList.prototypes = {
    products: PropTypes.array,
}

const mapStateToProps = state => ({
    products: state.products,
    carts: state.cart.cart
})

export default connect(mapStateToProps)(ProductList)
