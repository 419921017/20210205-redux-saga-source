import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from './../store/reducers/actions';

class Counter extends Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={this.props.asyncIncrement}>+</button>
      </div>
    );
  }
}

export default connect((state) => state.counter, actions)(Counter);
