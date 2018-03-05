import React, { Component } from 'react';
import { render } from 'react-dom';
import * as _ from 'ramda';

import Point from './point';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      turn: 'black', // Black always moves first
    };

    this.onPlay = this.onPlay.bind(this);
  }

  onPlay() {
    this.setState({ turn: this.state.turn === 'black' ? 'white' : 'black' });
  }

  grid(state, rawSize) {
    const size = parseInt(rawSize);
    return _.map(y =>
      _.map(x => {
        return (
          <Point
            key={`${x},${y}`}
            x={x}
            y={y}
            turn={state.turn}
            isTopEdge={y === 0}
            isRightEdge={x === size - 1}
            isBottomEdge={y === size - 1}
            isLeftEdge={x === 0}
            isStarPoint={
              // E.g. if grid(19) -> x and y are in [3,9,15]
              [3, Math.floor(size / 2), size - 4].indexOf(x) >= 0 &&
              [3, Math.floor(size / 2), size - 4].indexOf(y) >= 0
            }
          />
        );
      })(_.range(0, size))
    )(_.range(0, size));
  }

  render() {
    return (
      <div className="board" onClick={this.onPlay}>
        {this.grid(this.state, this.props.size)}
      </div>
    );
  }
}

export default Board;
