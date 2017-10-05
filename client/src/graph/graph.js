import React, {Component} from 'react';
import {connect} from 'react-redux';
const d3 = require('react-d3');
const LineChart = d3.LineChart;


class Graph extends Component {

  render(){
    const lineData = [
      {
        name: 'series1',
        values: [ { x: 0, y: 20 }, { x: 10, y: 10 } ]
      },
      {
        name: 'series2',
        values: [ { x: 7, y: 82 }, { x: 76, y: 82 } ]
      }
    ];

    return (<LineChart legend={false} data={lineData} width={500} height={300} title="chart"/>);
  }

}

export default connect()(Graph);