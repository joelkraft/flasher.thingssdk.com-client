import React from 'react';
import Nav from './Nav';

const Dashboard = props => (
    <div className="row">
        <Nav />
        {props.children}
    </div>
)

export default Dashboard;