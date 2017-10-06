import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlayerData, setGraphingPlayer} from '../Actions';
// import {LineChart, BarChart, ScatterPlot} from 'react-d3-basic';
// import {Chart} from 'react-d3-core';
// const d3basic = require('react-d3-basic');
// const LineChart = d3basic.LineChart;
// const BarChart = d3basic.BarChart;
// const ScatterPlot = d3basic.ScatterPlot;
// const Chart = d3basic.Chart;
import * as d3 from 'd3';


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
      values:  [ { x: 0, y: 30}, { x: i+1, y: player.player.ppg } ]
    })
  ) : null;
    // const chartSeries = [{field: 'ppg', name:'points per game'}];
    var width = 700,
      height = 400,
      title = 'stats';
    //   chartSeries = [
    //     {
    //       field: 'ppg',
    //       name: 'Ponts Per Game'
    //     }
    //   ],
    //   x = function(d) {
    //     return d.index;
    //   },
    //   xScale = 'ordinal',
    //   xLabel = 'Letter',
    //   yLabel = 'Frequency',
    //   yTicks = [0.5, 'ppg'];
    
    let counter = 0;
    this.props.playerData.forEach(item => {
      counter += item.player.ppg;
    });
    const averagePPG = counter / this.props.playerData.length;

    // const barGraph = this.props.graphPlayers.length ? <BarChart title={'Points per game'} legend={true} data={barData} width={width} height={height} chartSeries={chartSeries} x={x} xScale={xScale} xLabel={xLabel} yLabel={yLabel} yTicks={yTicks} /> : <span>Waiting on your selection! </span>;

    // const data = d3.csv('../../../../nba.csv');
    // console.log(data);
    const players = this.props.playerData.length ? this.props.playerData.map((obj, i) => <option key={i}> {obj.player.name} </option>) : null;
    const lineData = this.props.playerData.map((item, i)=> 
      ({
        name: item.player.name + ` number ${i}`,
        values: [{ x: parseFloat(item.player.ppg), y: parseFloat(item.player.apg) }]
      }));
      const y = (d)=>d.values[1];
    //   const yScale = d3.scaleLinear()
    //   .domain([0, d3.max(lineData, y)])
    //   .range([500, 0]);
      
    // const xScale = d3.scalePoint()
    //   .domain(lineData.map((d) => d.values[0]))
    //   .range([0, 500]);
 
    // <Chart title={title} width={width} height={height}>
    // <ScatterPlot  legend={false} chartSeries={[{field:'total', name: 'total', symbolSize: 6}]} data={lineData} width={500} height={300} title="chart" x={d=> d.values} />
    // {/*barGraph*/}
    // </Chart>

    return (
      <div className="graph">
        <form className="playerSelection">
          {/*}<input className="player1" ref={input => this.player1 = input}/>
    <input className="player2" ref={input => this.player2 = input}/>{*/}
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