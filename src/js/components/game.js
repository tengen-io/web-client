import React, { Component } from 'react';
import { render } from 'react-dom';
import * as R from 'ramda';
import { BOARD } from '../utils/constants';
import Loading from '../components/loading';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import {
  getPointFromCoords,
  getNeighborsFromCoords,
  isValidMove,
  updatePosition,
  getCleanBoardPosition,
} from '../utils/gameUtilities';

import Board from './board';
import Display from './display';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turn: BOARD.BLACK,
      inAtari: false,
      lastMovePassed: false,
      gameIsOver: false,
      position: getCleanBoardPosition(),
    };

    this.handleClick = this.handleClick.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  switchPlayer(turn) {
    return turn === BOARD.BLACK ? BOARD.WHITE : BOARD.BLACK;
  }

  // position + point -> position'
  playStone(position, selectedPoint) {
    return position.map(point => {
      if (
        point.x === selectedPoint.x &&
        point.y === selectedPoint.y
      ) {
        point.color = this.state.turn;
        return point;
      } else {
        return point;
      }
    });
  }

  handleClick(point) {
    if (this.state.gameIsOver) {
      console.log('Game is over');
      return;
    } else if (!isValidMove(this.state, point)) {
      console.error('BZZZT: Illegal move!');
      return;
    } else {
      this.setState({
        lastMovePassed: false,
        turn: this.switchPlayer(this.state.turn),
        position: updatePosition(
          this.state.position,
          point,
          this.state.turn,
        ),
      });
    }
  }

  handlePass() {
    this.pass();
  }

  pass() {
    if (this.state.lastMovePassed) {
      this.endGame();
    }
    this.setState({
      turn: this.switchPlayer(this.state.turn),
      lastMovePassed: true,
    });
  }

  endGame() {
    console.log('GAME OVER');
    this.setState({
      gameIsOver: true,
    });
  }

  resetGame() {
    this.setState({
      turn: BOARD.BLACK,
      inAtari: false,
      lastMovePassed: false,
      gameIsOver: false,
      position: getCleanBoardPosition(),
    });
  }

  handleNewGame() {
    this.resetGame();
  }

  renderBoard(data) {
    return (
      <Board
        size={this.props.size}
        turn={this.state.turn}
        position={this.state.position}
        gameIsOver={this.state.gameIsOver}
        handleClick={this.handleClick}
      />
    );
  }

  renderDisplay(data) {
    return (
      <Display
        turn={this.state.turn} // this should come from data, playerTurnId
        gameIsOver={this.state.gameIsOver}
        pass={this.handlePass}
        newGame={this.handleNewGame}
        gameData={data}
      />
    );
  }

  renderGame(data) {
    // console.log(data)
    return (
      <section className="game columns">
        <div className="column is-two-thirds">
          {this.renderBoard(data)}
        </div>
        <div className="column is-one-third">
          {this.renderDisplay(data)}
        </div>
      </section>
    );
  }

  render() {
    const id = this.props.id;
    return (
      <Query query={GET_GAME} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <p>No game loaded</p>;

          return this.renderGame(data);
        }}
      </Query>
    );
  }
}

const GET_GAME = gql`
  query Game($id: ID!) {
    game(id: $id) {
      id
      status
      playerTurnId
      players {
        id
        color
        user {
          username
        }
      }
      board {
        stones {
          x
          y
          color
        }
      }
    }
  }
`;
