import React, { Component } from 'react';
import {connect, Provider} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Graph from './graph/graph';
import {recieveGraphData} from './Actions';

class App extends Component {

  componentWillMount(){
    this.fetchGraph();
  }

  fetchGraph() {
    return fetch('/api/test').then(data => data.json()).then(data => this.props.dispatch(recieveGraphData(data)));
  }

  render() {
    let graphData = this.props.graphData;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
      
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Graph />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  graphData: state.graphData
});
export default connect(mapStateToProps)(App);
