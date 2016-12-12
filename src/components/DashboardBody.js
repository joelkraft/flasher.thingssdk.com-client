import React, { Component } from 'react';
import Sidebar from './Sidebar';
import DashboardMain from './DashboardMain';
import './DashboardBody.css';

export default class DashboardBody extends Component {
  render () {
      return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <DashboardMain />
            </div>
        </div>
      );
  }
}