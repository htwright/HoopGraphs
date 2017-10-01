import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      svg: "waiting"
    }
  }

  componentWillMount(){
    this.fetchGraph();
  }

  fetchGraph() {
    return fetch('/api/test').then(data => data.json()).then(data => this.setState({svg: data}));
  }

  render() {
    let svg = this.state.svg;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
      {svg}     
      
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
