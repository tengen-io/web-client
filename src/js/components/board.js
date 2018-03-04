import React, { Component } from 'react';
import { render } from 'react-dom';
import * as _ from 'ramda';

import Point from './point';

class Board extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   turn: 'black' // Black always moves first
    // }
  }

  zeroOneOrTwo() {
    return Math.floor(Math.random() * Math.floor(3));
  }

  grid(size) {
    return _.map(x =>
      _.map(y => {
        return <Point key={`${x},${y}`} x={x} y={y} />;
      })(_.range(1, size + 1))
    )(_.range(1, size + 1));
  }

  render() {
    return <div className="board">{this.grid(parseInt(this.props.size))}</div>;
  }
}

export default Board;
