import * as actionTypes from './../actionTypes';

let initState = {
  number: 0,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { number: state.number + 1 };
    default:
      return state;
  }
}

export default reducer;
