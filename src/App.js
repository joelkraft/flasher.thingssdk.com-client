import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = props.manifests;
  }

  componentWillMount() {
    console.log('componentWillMount');
    return axios.get('localhost:3001/v2').then((data) => {
      this.setState({
        manifests: data
      });

    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <pre>{this.state.manifests}</pre>
      </div>
    );
  }
}

export default App;
