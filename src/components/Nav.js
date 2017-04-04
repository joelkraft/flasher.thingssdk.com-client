import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Nav extends Component {
  render () {
      return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/">ThingsSDK Flasher</Link>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><a href="#">Help</a></li>
                </ul>
                <form className="navbar-form navbar-right">
                    <input type="text" className="form-control" placeholder="Search..." />
                </form>
                </div>
            </div>
        </nav>
      );
  }
}