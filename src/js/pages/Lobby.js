// The default screen a logged in player sees

import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import Loading from '../components/loading';
// import CreateGameModal from '../components/createGameModal';
import { Link } from 'react-router-dom';

import Input from '../components/input';

const LobbyRow = props => {
  return (
    <tr key={props.game.id}>
      <td>
        <Link className="button is-fullwidth" to={`/game/${props.game.id}`}>
          Join
        </Link>
      </td>
      <td>{props.game.id}</td>
      <td>{props.game.players[0].user.username}</td>
      <td>{props.game.players[1].user.username}</td>
    </tr>
  );
};

const LobbyTable = props => {
  return (
    <table className="table card is-hoverable is-fullwidth">
      <thead className="is-light">
        <tr>
          <th> </th>
          <th>Game</th>
          <th>⚫️ Player</th>
          <th>⚪️ Player</th>
        </tr>
      </thead>
      <tbody>
        {props.games.map((game, index) => <LobbyRow key={index} game={game} />)}
      </tbody>
    </table>
  );
};

const CreateGameCard = (props, children) => {
  return (
    <Mutation mutation={CREATE_GAME}>
      {(createGame, { loading, error, data }) => {
        if (data) {
          console.log('createGame data', data);
          props.history.push(`/game/${data.createGame.id}`);
        }
        return (
          <div className="card">
            <div className="card-content">
              <p>Opponent ID</p>
              <Input name="opponentId" inputType="text" placeholder="1738" />

              {error && (
                <div className="notification is-danger">{error.message}</div>
              )}
              {loading && (
                <button
                  disabled
                  onClick={() => {}}
                  className="button is-black is-outlined is-fullwidth is-loading"
                >
                  Create game
                </button>
              )}
              {!loading && (
                <button
                  onClick={e => {
                    createGame();
                  }}
                  className="button is-black is-outlined is-fullwidth"
                >
                  Create game
                </button>
              )}
            </div>
          </div>
        );
      }}
    </Mutation>
  );
};

export default class LobbyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createGameModalIsOpen: false,
    };

    this.toggleCreateGameModal = this.toggleCreateGameModal.bind(this);
  }

  toggleCreateGameModal() {
    this.setState({ createGameModalIsOpen: !this.state.createGameModalIsOpen });
  }

  createLobbyTable(data) {
    return (
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th> </th>
            <th>Game</th>
            <th>⚫️ Player</th>
            <th>⚪️ Player</th>
          </tr>
        </thead>
        <tbody>
          {data.games.map((game, index) => (
            <LobbyRow key={index} game={game} />
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <section className="page page--home">
        <div className="hero hero--home">
          <div className="hero-body">
            <h1 className="title is-1">Play</h1>
          </div>
        </div>

        <div className="columns is-centered">
          <div className="column is-one-quarter">
            <h4 className="title is-4">New game</h4>
            <p className="subtitle has-text-grey">Select an opponent</p>
            <CreateGameCard />
          </div>
          <div className="column is-three-quarters">
            <h4 className="title is-4">Current games</h4>
            <p className="subtitle has-text-grey">Join an existing game</p>
            <Query query={GET_GAMES}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />;
                if (error) return <p>Error!!!</p>;
                return <LobbyTable games={data.games} />;
              }}
            </Query>
          </div>
        </div>
      </section>
    );
  }
}

const GET_GAMES = gql`
  {
    games {
      id
      status
      players {
        id
        user {
          id
          username
        }
      }
    }
  }
`;

const CREATE_GAME = gql`
  mutation CreateGame($opponentId: ID!) {
    createGame(opponentId: $opponentId) {
      id
    }
  }
`;
