import React, { Component } from 'react';
import Nav from './Nav';

class Dashboard extends Component {
  render () {
    return (
      <div className="row">
        <Nav />
        {this.props.children}
      </div>
    )
  }
}

export default Dashboard;