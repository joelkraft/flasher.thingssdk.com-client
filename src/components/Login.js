import React from 'react';
import { connect } from 'react-redux';
import './Login.css';
import { sendCredentials } from '../actions/authenticate';


const Login = ({ dispatch }) => {
    let username, password;
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(sendCredentials(username.value, password.value));
        username.value = '';
        password.value = '';
    }

    return (
        <form onSubmit={onSubmit} className="form-signin">
            <h2 className="form-signin-heading">Please sign in</h2>
            <label htmlFor="inputUsername" className="sr-only">Username</label>
            <input 
                ref={node => {
                    username = node
                }}
                id="inputUsername"
                className="form-control"
                placeholder="Username"
                autoFocus
            />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input 
                ref={node => {
                    password = node
                }}
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required 
            />
            <div className="checkbox">
                <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    );
}
    
export default connect()(Login);