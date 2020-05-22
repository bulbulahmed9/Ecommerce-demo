import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getProduct } from '../../services/actions/productAction'
import PropTypes from 'prop-types'


// components
import Cart from '../../components/cart/Cart'
import ProductList from '../../components/product/ProductList'
import BigLoader from '../../components/loading/BigLoader'

const Homepage = ({ getProduct, products }) => {


    useEffect(() => {
        getProduct()
    }, [getProduct])

    return (
        products.products !== null ? <div className="container mt-5">
        <h3>All Products</h3>
        <div style={{ display: "flex" }}>
            <ProductList />
            <Cart />
        </div>
    </div> :
    <BigLoader />
    )
}

Homepage.prototypes = {
    products: PropTypes.array,
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(mapStateToProps, { getProduct })(Homepage)
