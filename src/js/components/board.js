import React, { Component } from 'react';
import { render } from 'react-dom';
import { BOARD } from '../utils/constants';

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

    this.size = props.game.boardSize;
    this.buildBoard = this.buildBoard.bind(this);
  }

  buildBoard() {
    let stonesObj = {};
    for (let s of this.props.game.stones) {
      stonesObj[[s.x, s.y]] = s;
    }

    let res = [];

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let stone = stonesObj[[x, y]];
        if (stone) {
          res.push(stone);
        } else {
          res.push(new Stone(x, y, null));
        }
      }
    }

    return res;
  }

  renderBoard() {
    let stones = this.buildBoard();

    return (
      <div className="board">
        {stones.map(point => {
          return (
            <Intersection
              key={point.x.toString() + ',' + point.y.toString()}
              x={point.x}
              y={point.y}
              color={point.color}
              turn={this.props.playerTurnId}
              gameIsOver={this.props.status == "complete"}
              isTopEdge={point.y === 0}
              isRightEdge={point.x === this.size - 1}
              isBottomEdge={point.y === this.size - 1}
              isLeftEdge={point.x === 0}
              addStone={this.props.addStone}
              isStarPoint={
                // E.g. if grid(19) -> x and y are in [3,9,15]
                [
                  3,
                  Math.floor(this.size / 2),
                  this.size - 4,
                ].indexOf(point.x) >= 0 &&
                [
                  3,
                  Math.floor(this.size / 2),
                  this.size - 4,
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
