import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {logoutUser} from '../../services/actions/authAction'
import './navmenu.css'

const Navmenu = ({ isAuth, logoutUser }) => {

    const navbarWithoutLogin = <Nav className="ml-auto">
        <NavLink className="nav-link mx-2" to="/login">Login</NavLink>
        <NavLink className="nav-link mx-2" to="/register">Register</NavLink>
    </Nav>

    const navbarWithLogin = <Nav className="ml-auto">
        <NavLink className="nav-link mx-2" to="/profile">Profile</NavLink>
        <Link onClick={() => logoutUser()} to="/" className="nav-link mx-2">Log out</Link>
    </Nav>

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <NavLink className="navbar-brand" to="/">Ecommerce</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {isAuth ? navbarWithLogin : navbarWithoutLogin}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {logoutUser})(Navmenu)
