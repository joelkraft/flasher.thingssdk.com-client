import React, { Component } from 'react';
import Nav from './Nav';
import DashboardBody from './DashboardBody';

export default class Dashboard extends Component {
  constructor (props) {
    super(props);
  }

  render () {
      return (
        <div className="row">
          <Nav />
          <DashboardBody />
        </div>
      )
  }
}