import React, { Component } from 'react';
import { render } from 'react-dom';
// import * as _ from 'ramda';
import { BOARD } from '../utils/constants';

import Board from './board';
import Display from './display';

export default class Game extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      turn: BOARD.BLACK,
      inAtari: false,
      lastMovePassed: false,
      // Makes an array of ${size}^2 objects, 
      // each with a coordinate pair and color
      position: ([ ...Array( props.size * props.size ).keys() ])
        .map( position => {

          let row = position % props.size;
          let column = Math.floor(position / props.size);

          return { x: row, y: column, color: BOARD.EMPTY }
        }
      )
    }

    this.handleBoardClick = this.handleBoardClick.bind(this);
  }
  
  switchPlayer(turn) {
    return (turn === BOARD.BLACK) 
      ? BOARD.WHITE
      : BOARD.BLACK
  }

  handleBoardClick(point) {
    console.log('thisPoint', point)
    // this.setState({ 
    //   turn: this.switchPlayer(this.state.turn)
    // });
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

  render() {
    // console.log('Game | position: ', this.state)
    // console.log('myTest', this.myTest)

    return (
      <section className="game columns">
        <div className="column is-two-thirds">
          <Board size={this.props.size}
                 turn={this.state.turn}
                 position={this.state.position}
                 handleBoardClick={this.handleBoardClick} />
        </div>
        <div className="column is-one-third">
          <Display turn={this.state.turn}/>
        </div>
      </section>
    )
  }
}