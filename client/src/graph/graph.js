import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlayerData} from '../Actions';
const d3 = require('react-d3');
const LineChart = d3.LineChart;


class Graph extends Component {

  componentWillMount(){
    this.props.dispatch(fetchPlayerData());
  }


  render(){
    const players = this.props.playerData.length ? this.props.playerData.map((obj, i) => <option key={i}> {obj.player.name} </option>) : null;
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
 
    return (
      <div className="graph">
        <LineChart legend={false} data={lineData} width={500} height={300} title="chart"/>
        <form className="playerSelection">
          <input className = "player1" ref={input => this.player1 = input}/>
          <input className = "player2" ref={input => this.player2 = input}/>
          <select> {players} </select>
        </form>
      </div>
    );
  }

}
const mapStateToProps = (state) => ({
  graphData : state.graphData,
  playerData : state.playerData
});
export default connect(mapStateToProps)(Graph);