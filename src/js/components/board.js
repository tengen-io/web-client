import React, { Component } from 'react';
import { render } from 'react-dom';
import * as _ from 'ramda';
import { BOARD } from '../utils/constants';

import Intersection from './intersection';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: this.props.position
    };

    // this.myFunction = this.myFunction.bind(this);
  }



  render() {
    return (
      <div className="board">
        { this.state.position.map( point => {
          return (
            <Intersection
              key={ point.x.toString() + ',' + point.y.toString() }
              x={point.x}
              y={point.y}
              color={point.color}
              turn={this.props.turn}
              gameIsOver={this.props.gameIsOver}
              isTopEdge={point.y === 0}
              isRightEdge={point.x === this.props.size - 1}
              isBottomEdge={point.y === this.props.size - 1}
              isLeftEdge={point.x === 0}
              handleIntersectionClick={this.props.handleBoardClick}
              isStarPoint={
                // E.g. if grid(19) -> x and y are in [3,9,15]
                [3, Math.floor(this.props.size / 2), this.props.size - 4].indexOf(point.x) >= 0 &&
                [3, Math.floor(this.props.size / 2), this.props.size - 4].indexOf(point.y) >= 0
              }
            />
          )} 
        )}
      </div>
    );
  }
}

export default Board;
