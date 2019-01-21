// The default screen a logged in player sees

import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import Loading from '../components/loading';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import Input from '../components/input';

const LobbyRow = props => {
  return (
    <tr key={props.game.id}>
      <td>
        <Link
          className="button is-fullwidth"
          to={`/game/${props.game.id}`}
        >
          Watch
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
    <section className="card">
      <table className="table is-hoverable is-fullwidth">
        <thead className="is-light">
          <tr>
            <th> </th>
            <th>Game</th>
            <th>⚫️ Player</th>
            <th>⚪️ Player</th>
          </tr>
        </thead>
        <tbody>
          {props.games.map((game, index) => (
            <LobbyRow key={index} game={game} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

class CreateGameCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opponentId: '',
      newGameId: null,
    };

    this.handleOpponentIDChange = this.handleOpponentIDChange.bind(
      this,
    );
  }

  handleOpponentIDChange(event) {
    this.setState({ opponentId: event.target.value });
  }

  // submitCreateGame(createGame) {
  //   createGame({ variables: this.state }).then(res => {
  //     console.log('createGame', res);
  //   });
  // }

  render() {
    if (this.state.newGameId) {
      return <Redirect to={`/game/${this.state.newGameId}`} />;
    }
    return (
      <Mutation
        mutation={CREATE_GAME}
        variables={{ opponentId: this.state.opponentId }}
      >
        {(createGame, { loading, error, data }) => {
          if (data) {
            this.setState({ newGameId: data.createGame.id });
          }
          return (
            <div className="card">
              <div className="card-content">
                <p>Opponent ID</p>
                <Input
                  name="opponentId"
                  inputType="text"
                  placeholder="1738"
                  content={this.state.opponentId}
                  controlFunc={this.handleOpponentIDChange}
                />
                {error && (
                  <div className="notification is-danger">
                    {error.message}
                  </div>
                )}
              </div>
              <div className="card-footer">
                <p className="card-footer-item">
                  {loading && (
                    <button
                      disabled
                      className="button is-black is-outlined is-fullwidth is-loading"
                    >
                      Create game
                    </button>
                  )}
                  {!loading && (
                    <button
                      onClick={createGame}
                      className="button is-black is-outlined is-fullwidth"
                    >
                      Create game
                    </button>
                  )}
                </p>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default class LobbyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section className="section page page--home">
        <div className="hero hero--home">
          <div className="hero-body">
            <h1 className="title is-1">Play</h1>
          </div>
        </div>

        <div className="container">
          <div className="columns is-centered">
            <div className="column is-one-quarter">
              <h4 className="title is-4">New game</h4>
              <p className="subtitle has-text-grey">
                Select an opponent
              </p>
              <CreateGameCard />
            </div>

            <div className="column is-three-quarters">
              <h4 className="title is-4">Current games</h4>
              <p className="subtitle has-text-grey">
                Join an existing game
              </p>
              <Query query={GET_GAMES}>
                {({ loading, error, data }) => {
                  if (loading) return <Loading />;
                  if (error) return <p>Error!!!</p>;
                  return <LobbyTable games={data.lobby} />;
                }}
              </Query>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const GET_GAMES = gql`
  {
    lobby {
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
