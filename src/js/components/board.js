import React, { Component } from 'react';
import { render } from 'react-dom';
import * as _ from 'ramda';
import { BOARD } from '../utils/constants';

import Intersection from './intersection';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      turn: BOARD.BLACK,
      lastMovePassed: false,
      inAtari: false,
      // Makes an array of ${size}^2 objects, 
      // each with a coordinate pair and color
      position: ([ ...Array( props.size * props.size ).keys() ])
        .map( position => {

          let row = position % props.size;
          let column = Math.floor(position / props.size);

          return { x: row, y: column, color: BOARD.EMPTY }
        }
      ) 
    };

    this.handleBoardClick = this.handleBoardClick.bind(this);

  }

  handleBoardClick(e) {
    console.log(e.target)
    this.setState({ 
      turn: this.switchPlayer(this.state.turn)
    });
  }

  switchPlayer(turn) {
    return (turn === BOARD.BLACK) 
      ? BOARD.WHITE
      : BOARD.BLACK
  }

  pass() {
    if (this.state.lastMovePassed) {
      this.endGame()
    }
    this.setState({lastMovePassed: true});
    this.switchPlayer();
  }

  endGame() {
    console.log('GAME OVER');
    // Start counting?
  }

  createPointJsx(position) {
    return <Intersection
              key={ position.x.toString() + ',' + position.y.toString() }
              x={position.x}
              y={position.y}
              color={position.color}
              turn={this.state.turn}
              isTopEdge={position.y === 0}
              isRightEdge={position.x === this.props.size - 1}
              isBottomEdge={position.y === this.props.size - 1}
              isLeftEdge={position.x === 0}
              isStarPoint={
                // E.g. if grid(19) -> x and y are in [3,9,15]
                [3, Math.floor(this.props.size / 2), this.props.size - 4].indexOf(position.x) >= 0 &&
                [3, Math.floor(this.props.size / 2), this.props.size - 4].indexOf(position.y) >= 0
              }
          />
  }

  render() {
    // --- TODO: Style me dynamically
    // let style = {
    //     gridTemplateColumns: `repeat(${this.size}, 1fr)`,
    //     gridTemplateRows: `repeat(${this.size}, 1fr)`
    // }
    let stone = this.state.turn;
    return (
      <div className="board" onClick={(e) => this.handleBoardClick(e)}>
        { this.state.position.map( position => this.createPointJsx(position) )}
      </div>
    );
  }
}

export default Board;
