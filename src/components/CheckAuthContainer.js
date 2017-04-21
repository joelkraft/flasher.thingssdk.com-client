import React from "react"
import { connect } from "react-redux"

//Router
import { Route, Redirect, withRouter } from "react-router-dom"

const mapStateToProps = (state) => ({
    authenticated: state.authenticate.authenticated
})

const CheckAuth = props => {
    const {LoginPage, Protected, location, authenticated} = props
    const { pathname } = location
    if (authenticated) {
        if (pathname === "/login") {
            return <Redirect to="/" />
        }
        return <Route path={pathname} component={Protected} />
    }
    if (pathname === '/login') {
        return <Route path="/login" component={LoginPage} />
    }
    return <Redirect to="login" />
}

export default withRouter(connect(mapStateToProps)(CheckAuth))
