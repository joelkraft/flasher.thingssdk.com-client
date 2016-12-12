import React, { Component } from 'react';

export default class Sidebar extends Component {
  render () {
      return (
        <div className="col-sm-3 col-md-2 sidebar">
        <ul className="nav nav-sidebar">
            <li className="active"><a href="#">All Manifests <span className="sr-only">(current)</span></a></li>
            <li><a href="#">My Manifests</a></li>
        </ul>
        </div>
      );
  }
}