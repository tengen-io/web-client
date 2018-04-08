import React, { Component } from 'react';
import { render } from 'react-dom';
import * as _ from 'ramda';
import { BOARD } from '../utils/constants';

import Intersection from './intersection';

class Board extends Component {
  constructor(props) {
    super(props);

    console.log('PROPS', props)

    // this.position = props.position;

    this.state = {
      position: this.props.position
    };

    
  }

  createPointJsx(point) {
    return <Intersection
              key={ point.x.toString() + ',' + point.y.toString() }
              x={point.x}
              y={point.y}
              color={point.color}
              turn={this.props.turn}
              isTopEdge={point.y === 0}
              isRightEdge={point.x === this.props.size - 1}
              isBottomEdge={point.y === this.props.size - 1}
              isLeftEdge={point.x === 0}
              onClick={() => this.props.handleBoardClick(point)}
              isStarPoint={
                // E.g. if grid(19) -> x and y are in [3,9,15]
                [3, Math.floor(this.props.size / 2), this.props.size - 4].indexOf(point.x) >= 0 &&
                [3, Math.floor(this.props.size / 2), this.props.size - 4].indexOf(point.y) >= 0
              }
          />
  }

  render() {
    // --- TODO: Style me dynamically
    // let style = {
    //     gridTemplateColumns: `repeat(${this.size}, 1fr)`,
    //     gridTemplateRows: `repeat(${this.size}, 1fr)`
    // }
    // console.log('board state', this.state)
    // console.log('board props', this.props)
    let stone = this.props.turn;
    return (
      <div className="board">
        { this.state.position.map( point => this.createPointJsx(point) )}
      </div>
    );
  }
}

export default Board;
