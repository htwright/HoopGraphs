const initialState = {
  graphData: {},
  playerData:{},
  loading:false
};


 const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'RECIEVE_GRAPH_DATA':
      return {
        ...state,
        graphData: action.data
      }
    case 'REQUEST_PLAYER_DATA':
    return{
      ...state,
      loading:true
    }
    case 'RECIEVE_PLAYER_DATA':
    return {
      ...state,
      loading:false,
      playerData:action.data
    }
      default : 
        return state;
    
  }
}
export default reducer;