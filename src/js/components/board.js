import React, { Component } from 'react';
import { render } from 'react-dom';
import * as _ from 'ramda';
import { BOARD } from '../utils/constants';

import {
  getPointFromCoords,
  getNeighborsFromCoords,
  getCleanBoardPosition,
} from '../utils/gameUtilities';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Intersection from './intersection';

class Stone {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

class Board extends Component {
  constructor(props) {
    super(props);

    this.size = props.size;
    this.stones = [];

    this.buildBoard(props.stones)
  }

  buildBoard(stones) {
    let stonesObj = {};
    for (let s of stones) {
      stonesObj[[s.x, s.y]] = s;
    }

    let res = [];

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let stone = stonesObj[[x, y]];
        if (stone) {
          res.push(stone)
        } else {
          res.push(new Stone(x, y, null));
        }
      }
    }

    this.stones = res;
  }

  renderBoard() {
    // Need to loop over position, not stones
    return (
      <div className="board">
        {this.stones.map(point => {
          return (
            <Intersection
              key={point.x.toString() + ',' + point.y.toString()}
              x={point.x}
              y={point.y}
              color={point.color}
              turn={this.props.turn}
              gameIsOver={this.props.gameIsOver}
              isTopEdge={point.y === 0}
              isRightEdge={point.x === this.props.size - 1}
              isBottomEdge={point.y === this.props.size - 1}
              isLeftEdge={point.x === 0}
              addStone={this.props.addStone}
              isStarPoint={
                // E.g. if grid(19) -> x and y are in [3,9,15]
                [
                  3,
                  Math.floor(this.props.size / 2),
                  this.props.size - 4,
                ].indexOf(point.x) >= 0 &&
                [
                  3,
                  Math.floor(this.props.size / 2),
                  this.props.size - 4,
                ].indexOf(point.y) >= 0
              }
            />
          );
        })}
      </div>
    );
  }

  render() {
    return this.renderBoard();
  }
}

export default Board;
