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
      gameIsOver: false,
      position: ([ ...Array( props.size * props.size ).keys() ])
        .map( position => {

          let row = position % props.size;
          let column = Math.floor(position / props.size);

          return { x: row, y: column, color: BOARD.EMPTY }
        }
      )
    }

    this.handleClick = this.handleClick.bind(this);
    this.handlePass = this.handlePass.bind(this);
  }
  
  switchPlayer(turn) {
    return (turn === BOARD.BLACK) 
      ? BOARD.WHITE
      : BOARD.BLACK
  }

  handleClick(point) {
    console.log('handleClick getNeighbors', this.getNeighbors(point))
    if (this.state.gameIsOver) {
      console.log('Game is over')
      return;
    } else {
      this.setState({ 
        turn: this.switchPlayer(this.state.turn)
      });
    }
  }

  // Board state and changes in the form of
  // [{x,y,color},...]
  getNeighbors(point) {

  }

  handlePass() {
    this.pass();
  }
  
  pass() {
    if (this.state.lastMovePassed) {
      this.endGame()
    }
    this.setState({
      turn: this.switchPlayer(this.state.turn),
      lastMovePassed: true
    });
  }

  endGame() {
    console.log('GAME OVER');
    this.setState({ gameIsOver: true })
  }

  render() {

    return (
      <section className="game columns">
        <div className="column is-two-thirds">
          <Board size={this.props.size}
                 turn={this.state.turn}
                 position={this.state.position}
                 gameIsOver={this.state.gameIsOver}
                 handleClick={this.handleClick} />
        </div>
        <div className="column is-one-third">
          <Display turn={this.state.turn}
                   gameIsOver={this.state.gameIsOver}
                   pass={this.handlePass}/>
        </div>
      </section>
    )
  }
}