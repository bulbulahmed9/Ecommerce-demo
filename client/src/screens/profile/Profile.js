import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import 'moment-timezone';
import BigLoader from '../../components/loading/BigLoader'
import MiniLoader from '../../components/loading/MiniLoader'
import { loadUser } from '../../services/actions/authAction'
import { updatePhone } from '../../services/actions/profileAction'
import { getUserOrder } from '../../services/actions/getUserOrderAction'

import demo from '../../shared/img/demo.svg'

const Profile = ({ profile, loadUser, updatePhone, loading, getUserOrder, orders }) => {



    useEffect(() => {
        loadUser()
        getUserOrder()
    }, [loadUser, loading, getUserOrder])

    let name = profile && profile.name
    let email = profile ? profile.email || profile.googleEmail || profile.facebookEmail : null
    let dateToFormat = profile && profile.createdAt

    const [openBox, setOpenBox] = useState(false)
    const [number, setNumber] = useState({
        number: ""
    })


    const handleNumberChange = (e) => {
        setNumber({
            number: e.target.value
        })
    }

    const toggleOpenBox = () => {
        setOpenBox(!openBox)
    }

    return (
        profile ? <div className="container my-5">
            <div className="card">
                <div className="card-header">
                    <h3>User Profile</h3>
                </div>
                <div className="card-body">
                    <h4 className="my-3">Welcome {name} </h4>
                    {email !== null && <h6>Email : {email} </h6>}
                    {profile.phone === undefined ? "" : <h6> Phone: {`0${profile.phone}`} </h6>}

                    <button onClick={() => toggleOpenBox()} className="btn btn-info mt-3">  {profile.phone === undefined ? "Add Phone Number" : "Update Phone Number"}  {loading && <MiniLoader />} </button> <br />
                    {openBox && <div>
                        <input value={number.number} onChange={(e) => handleNumberChange(e)} className="mt-3 form-control" placeholder="Enter Phone number" />
                        <button onClick={() => {
                            updatePhone(number.number)
                            toggleOpenBox()
                        }
                        } className="btn btn-info mt-3">Update</button>
                    </div>}
                    <p className="card-text mt-3"> Member Since <Moment format="DD/MM/YYYY">{dateToFormat}</Moment> </p>
                </div>
            </div> <br /> <br />
            {orders.length > 0 ? <div>
                <h3 className="mb-3">Your Order</h3>
                <div className="row">
                    {

                        orders.map((order, index) => {
                            return <div key={index} className="col-md-4">
                                <div className="card mb-4" style={{ width: '18rem' }}>
                                    <img className="card-img-top" src={demo} alt="product" />
                                    <div className="card-body">
                                        <h5 className="card-title"> {order.name} </h5>
                                        <p className="card-text"> Quantity: {order.quantity} </p>
                                        <p className="card-text"> Price {`$${order.price}.00`} </p>
                                        <p className="card-text"> Grand Total: {`$${order.price * order.quantity}.00`} </p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div> : <h3>Currrently You don't have any pending order</h3>
            }
        </div> : <BigLoader />

    )
}

Profile.prototypes = {
    profile: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    updatePhone: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}
const mapStateToProps = state => ({
    profile: state.auth.profile,
    loading: state.profileReducer.loading,
    orders: state.userOrder.order
})

export default connect(mapStateToProps, { loadUser, updatePhone, getUserOrder })(Profile)
