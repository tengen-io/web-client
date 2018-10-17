import React, {Component} from 'react';
import {render} from 'react-dom';
// import * as _ from 'ramda';
import {BOARD} from '../utils/constants';

export default class Display extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: ('0' + new Date().getMinutes()).slice(-2),
      seconds: ('0' + new Date().getSeconds()).slice(-2),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      minutes: ('0' + new Date().getMinutes()).slice(-2),
      seconds: ('0' + new Date().getSeconds()).slice(-2),
    });
  }

  render() {
    let turn = this.props.turn === BOARD.BLACK ? 'Black' : 'White';
    let stone = this.props.turn === BOARD.BLACK ? '⚫️' : '⚪️';

    let gameIsOver = this.props.gameIsOver;

    let displayText = gameIsOver ? 'Game over' : `${stone} ${turn} to play`;

    let buttonText = gameIsOver ? 'New game' : 'Pass';

    // <p className="display__time title is-2">
    //   {`${this.state.minutes}:${this.state.seconds}`}
    // </p>

    return (
      <div className="display card">
        <div className="card-content has-text-centered">

          <p className="display__subtitle subtitle is-5">{displayText}</p>
          {!gameIsOver || (
            <button className="button" onClick={() => this.props.newGame()}>
              New game
            </button>
          )}
          {gameIsOver || (
            <button className="button" onClick={() => this.props.pass()}>
              Pass
            </button>
          )}
        </div>
      </div>
    );
  }
}
