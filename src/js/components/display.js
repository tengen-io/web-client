import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { render } from 'react-dom';
// import * as _ from 'ramda';
import { BOARD } from '../utils/constants';

export default class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let turn = this.props.turn === BOARD.BLACK ? 'Black' : 'White';
    let stone = this.props.turn === BOARD.BLACK ? '⚫️' : '⚪️';

    let gameIsOver = this.props.gameIsOver;

    let displayText = gameIsOver
      ? 'Game over'
      : `${stone} ${turn} to play`;
    let buttonText = gameIsOver ? 'New game' : 'Pass';

    const playerBlack = this.props.gameData.game.players.filter(
      p => p.color === 'black',
    )[0].user;
    const playerWhite = this.props.gameData.game.players.filter(
      p => p.color === 'white',
    )[0].user;

    return (
      <div className="display card">
        <div className="card-content">
          <p className="display__subtitle title is-4">
            {displayText}
          </p>

          <p>⚫️ {playerBlack.username}</p>
          <p>⚪️ {playerWhite.username}</p>
        </div>
        <footer className="card-footer">
          <p className="card-footer-item">
            {!gameIsOver || (
              <button
                className="button is-black is-outlined is-fullwidth"
                onClick={() => this.props.newGame()}
              >
                New game
              </button>
            )}
            {gameIsOver || (
              <Mutation mutation={PASS}>
                {(pass, { loading, error, data }) => {
                  if (loading) {
                    return (
                      <button className="button is-black is-outlined is-fullwidth is-loading">
                        Pass
                      </button>
                    );
                  }
                  return (
                    <button
                      className="button is-black is-outlined is-fullwidth"
                      onClick={e =>
                        pass({
                          variables: { gameId: this.props.gameId },
                        })
                      }
                    >
                      Pass
                    </button>
                  );
                }}
              </Mutation>
            )}
          </p>
        </footer>
      </div>
    );
  }
}

const PASS = gql`
  mutation Pass($gameId: ID!) {
    pass(gameId: $gameId) {
      id
    }
  }
`;
