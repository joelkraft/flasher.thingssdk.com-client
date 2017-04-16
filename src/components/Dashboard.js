import React from 'react'
import Nav from './Nav'
import { Route } from 'react-router-dom'

import DashboardManifests from './DashboardManifests'
import DashboardProfile from './DashboardProfile';

const Dashboard = ({match}) => {
return (
    <div className="row">
        <Nav />
        <Route exact path="/" component={DashboardManifests} />
        {console.log('wut',`/${match.params.page}`)}
        <Route path={`/${match.params.page}`} component={DashboardProfile} />
    </div>
)}

export default Dashboard;