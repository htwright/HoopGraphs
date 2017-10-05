


export const RECIEVE_GRAPH_DATA = 'RECIEVE_GRAPH_DATA';
export const recieveGraphData = (data) => ({
  type: RECIEVE_GRAPH_DATA,
  data
});

export const REQUEST_PLAYER_DATA = 'REQUEST_PLAYER_DATA';
export const requestPlayerData = () => ({
  type: REQUEST_PLAYER_DATA
});

export const RECIEVE_PLAYER_DATA = 'RECIEVE_PLAYER_DATA';
export const recievePlayerData = (data) => ({
  type: RECIEVE_PLAYER_DATA,
  data
});

const fetchPlayerData = () => {
  requestPlayerData();
  fetch('/api/players')
  .then(data => data.json())
  .then(data => recievePlayerData(data))
  .catch(err => console.error(err));
};