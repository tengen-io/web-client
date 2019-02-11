import React from 'react';
import { Mutation } from 'react-apollo';
import { PASS } from '../graphql/mutations';

const Display = ({ game, gameId, turnId, gameIsOver, newGame }) => {
  const playerBlack = game.players.filter(
    p => p.color === 'black',
  )[0];
  const playerWhite = game.players.filter(
    p => p.color === 'white',
  )[0];

  // We can use loose equality here because ids are unique
  // and playerTurnId comes back as an int rather than string.
  const turn = turnId == playerBlack.id ? 'Black' : 'White';
  const stone = turnId == playerBlack.id ? '⚫️' : '⚪️';

  const displayText = gameIsOver
    ? 'Game over'
    : `${stone} ${turn} to play`;
  // const buttonText = gameIsOver ? 'New game' : 'Pass';

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
              type='button'
              className="button is-black is-outlined is-fullwidth"
              onClick={() => newGame()}
            >
              New game
              </button>
          )}
          {gameIsOver || (
            <Mutation mutation={PASS}>
              {(pass, { loading, error, data }) => {
                if (loading) {
                  return (
                    <button type='button' className="button is-black is-outlined is-fullwidth is-loading">
                      Pass
                    </button>
                  );
                }
                return (
                  <button
                    type='button'
                    className="button is-black is-outlined is-fullwidth"
                    onClick={() =>
                      pass({
                        variables: { gameId },
                      }).then(g => console.log('game', g))
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
};

export default Display;
