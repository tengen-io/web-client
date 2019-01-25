import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { render } from 'react-dom';
import { BOARD } from '../utils/constants';

export default class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const playerBlack = this.props.game.players.filter(
      p => p.color === 'black',
    )[0];
    const playerWhite = this.props.game.players.filter(
      p => p.color === 'white',
    )[0];

    // We can use loose equality here because ids are unique
    // and playerTurnId comes back as an int rather than string.
    let turn = this.props.turn == playerBlack.id ? 'Black' : 'White';
    let stone = this.props.turn == playerBlack.id ? '⚫️' : '⚪️';

    let gameIsOver = this.props.gameIsOver;

    let displayText = gameIsOver
      ? 'Game over'
      : `${stone} ${turn} to play`;
    let buttonText = gameIsOver ? 'New game' : 'Pass';


    return (
      <div className="display card">
        <div className="card-content">
          <p className="display__subtitle title is-4">
            {displayText}
          </p>

          <p>⚫️ {playerBlack.user.username}</p>
          <p>⚪️ {playerWhite.user.username}</p>
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
                        }).then(game => console.log('game', game))
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
      game
    }
  }
`;
