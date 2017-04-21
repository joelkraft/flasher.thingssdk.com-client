import React from "react"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import { logout } from '../actions/authenticate'

const mapStateToDispatch = (
    dispatch,
    ownProps
) => ({
    onClick: (e) => {
        e.preventDefault()
        dispatch(logout())
    }
})

const mapStateToProps = state=>state

const Nav = ({dispatch, onClick }) => {
    return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#navbar"
                        aria-expanded="false"
                        aria-controls="navbar"
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <Link className="navbar-brand" to="/">
                        ThingsSDK Flasher
                    </Link>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><a href="#">Help</a></li>
                        <li><a href="#" onClick={onClick}>Log out</a></li>
                    </ul>
                    <form className="navbar-form navbar-right">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                        />
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default connect(mapStateToProps,mapStateToDispatch)(Nav)
