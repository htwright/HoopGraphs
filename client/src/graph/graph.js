import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlayerData, setGraphingPlayer} from '../Actions';
const d3 = require('react-d3');
const LineChart = d3.LineChart;
const BarChart = d3.BarChart;


class Graph extends Component {

  componentWillMount(){
    this.props.dispatch(fetchPlayerData());
  }

  setPlayerinState(){
    console.log(this.selectedPlayer.value);
    const player = this.props.playerData.filter(a => a.player.name === this.selectedPlayer.value);
    console.log(player);
    this.props.dispatch(setGraphingPlayer(player[0]));
  }

  render(){
    const barData = this.props.graphPlayers.length ? this.props.graphPlayers.map((player, i) => ({
      name: `Player ${i+1}`,
      values:  [ { x: 0, y: player.ppg }, { x: 10, y: 10 } ]
    })
  ) : null;
    // const chartSeries = [{field: 'ppg', name:'points per game'}];
    var width = 700,
      height = 400,
      chartSeries = [
        {
          field: 'ppg',
          name: 'Ponts Per Game'
        }
      ],
      x = function(d) {
        return d.values;
      },
      xScale = 'ordinal',
      xLabel = 'Letter',
      yLabel = 'Frequency',
      yTicks = [0.5, 'ppg'];
    let counter;
    this.props.playerData.forEach(item => {
      counter+= item.player.ppg;
    });
    const averagePPG = counter / this.props.playerData.length;

    const barGraph = this.props.graphPlayers.length ? <BarChart title={'Points per game'} legend={true} data={barData} width={width} height={height} chartSeries={chartSeries} x={x} xScale={xScale} xLabel={xLabel} yLabel={yLabel} yTicks={yTicks} /> : <span>Waiting on your selection! </span>;

    const players = this.props.playerData.length ? this.props.playerData.map((obj, i) => <option key={i}> {obj.player.name} </option>) : null;
    const lineData = this.props.playerData.map((item, i)=> 
      ({
        name: item.player.name + ` number ${i}`,
        values: [ { x: 0, y: 0 }, { x: item.player.ppg, y: item.player.ppg } ]
      }));
 
    return (
      <div className="graph">
        <LineChart legend={false} data={lineData} width={500} height={300} title="chart"/>
        {barGraph}
        <form className="playerSelection">
          <input className="player1" ref={input => this.player1 = input}/>
          <input className="player2" ref={input => this.player2 = input}/>
          <select ref={input=>this.selectedPlayer = input} onChange={()=>this.setPlayerinState()}> {players} </select>
        </form>
      </div>
    );
  }

}
const mapStateToProps = (state) => ({
  graphData : state.graphData,
  playerData : state.playerData,
  graphPlayers: state.graphPlayers
});
export default connect(mapStateToProps)(Graph);