import React from 'react'
import './cart.css'
import { connect } from 'react-redux'
import MiniLoader from '../loading/MiniLoader'
import { removeCart, clearCart, incrementCart, decrementCart, checkout } from '../../services/actions/cartAction'
import { toast } from 'react-toastify'

const Cart = ({ removeCart, cart, clearCart, incrementCart, decrementCart, grandTotal, checkout, loading, isAuth }) => {


    const makeOrder = (cart) => {
        if (!isAuth) {
            return toast("Please log in to make an order")
        } else {
            checkout(cart)
        }
    }

    return (
        cart.length ? <div className="cart-box col-md-4">
            <div className="cart-header df-between">
                <h5>Your Cart</h5>
                <button onClick={() => clearCart()} className="clear">
                    Clear <i className="fas fa-trash"></i>
                </button>
            </div>
            {
                cart.map(item => {
                    return <div key={item._id} className="single-product mb-3">
                        <div className="df">
                            <p className="product-name"> {item.info.name} </p>
                            <button onClick={() => decrementCart(item)} className="decrement">-</button>
                            <p className="quantity"> {item.quantity} </p>
                            <button onClick={() => incrementCart(item)} className="increment">+</button>
                            <p className="price">${item.info.price * item.quantity}.00 </p>
                            <button onClick={() => removeCart(item)} className="cross">
                                X
                            </button>
                        </div>
                    </div>
                })
            }
            <div className="df-between order-box">
                <button onClick={() => {
                    makeOrder(cart)
                }} className="order">Place Order {loading && <MiniLoader />} </button>
                <p className="grand-total"> {`$${grandTotal}.00`} </p>
            </div>
        </div> : <div className="col-md-4">
                <h4>Your cart is empty</h4>
            </div>
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    loading: state.cart.loading,
    cart: state.cart.cart,
    grandTotal: state.cart.cart.length && state.cart.cart.reduce((total, currenValue) => {
        return total + currenValue.info.price * currenValue.quantity
    }, 0)
})

export default connect(mapStateToProps, { removeCart, clearCart, incrementCart, decrementCart, checkout })(Cart)
