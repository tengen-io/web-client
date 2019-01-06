import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const CreateGameModal = (props, children) => {
  return (
    <Mutation mutation={CREATE_GAME}>
      {(createGame, { loading, error, data }) => {
        if (data) {
          console.log('createGame data', data);
          props.history.push(`/game/${data.createGame.id}`);
        }
        return (
          <div
            className={`modal ${props.createGameModalIsOpen && 'is-active'}`}
          >
            <div
              onClick={props.toggleCreateGameModal}
              className="modal-background"
            />
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Create game</p>
                <button
                  onClick={props.toggleCreateGameModal}
                  className="delete"
                  aria-label="close"
                />
              </header>
              <section className="modal-card-body">{props.children}</section>
              <footer className="modal-card-foot">
                {error && (
                  <div className="notification is-danger">{error.message}</div>
                )}
                {loading && (
                  <button disabled className="button is-success is-loading">
                    Create
                  </button>
                )}
                {!loading && (
                  <button onClick={createGame} className="button is-success">
                    Create
                  </button>
                )}

                <button
                  onClick={props.toggleCreateGameModal}
                  className="button"
                >
                  Discard
                </button>
              </footer>
            </div>
          </div>
        );
      }}
    </Mutation>
  );
};

const CREATE_GAME = gql`
  mutation CreateGame($opponentId: ID!) {
    createGame(opponentId: $opponentId) {
      id
    }
  }
`;

export default CreateGameModal;
