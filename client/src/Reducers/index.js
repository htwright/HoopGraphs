const initialState = {
  graphData: {}
};


 const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'RECIEVE_GRAPH_DATA':
      return {
        ...state,
        graphData: action.data
      }
      break;
      default : 
        return state;
        break;
    
  }
}
export default reducer;