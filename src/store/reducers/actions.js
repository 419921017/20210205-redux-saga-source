import * as actionTypes from '../actionTypes';

const actions = {
  asyncIncrement() {
    return {
      type: actionTypes.ASYNC_INCREMENT,
    };
  },
};

export default actions;
