import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../actions/authenticate";

const mapStateToDispatch = (dispatch, ownProps) => ({
    onLogoutClick: e => {
        e.preventDefault();
        dispatch(logout());
    }
});

const mapStateToProps = state => ({
    user: state.user.info
});

const Nav = ({ dispatch, onLogoutClick, onProfileLinkClick, user }) => {
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
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li><a href="#">Help</a></li>
                        <li><a href="#" onClick={onLogoutClick}>Log out</a></li>
                    </ul>
                    <form className="navbar-form navbar-right">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                        />
                    </form>
                    <p className="navbar-text navbar-right">
                        Signed in as
                        {" "}
                        <span id="login-name">{`${user.fName} ${user.lName}`}</span>
                        {" "}
                        {user.isAdmin
                        ? <span className="label label-warning">ADMIN</span>
                        : null}
                    </p>

                </div>
            </div>
        </nav>
    );
};

export default connect(mapStateToProps, mapStateToDispatch)(Nav);
