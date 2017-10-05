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
      default : 
        return state;
    
  }
}
export default reducer;