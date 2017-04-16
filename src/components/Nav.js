import React from "react";
import { Link, Route } from "react-router-dom";

import Profile from "./DashboardProfile";

const Nav = props => {
    return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <Route path="/profile" component={Profile} />
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
    );
};

export default Nav;
