// The default screen a logged in player sees

import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Loading from '../components/loading';
import { Link } from 'react-router-dom';

export default class LobbyPage extends React.Component {
  createLobbyRow(game) {
    console.log(game)
    return (
      <tr key={game.id}>
        <td>
          <Link className="button is-outlined" to={`/game/${game.id}`}>
            Join
          </Link>
        </td>
        <td>{game.id}</td>
        <td>{game.players[0].user.username}</td>
        <td>{game.players[1].user.username}</td>
      </tr>
    );
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
        <tbody>{data.games.map(this.createLobbyRow)}</tbody>
      </table>
    );
  }

  render() {
    return (
      <section className="page page--home">

        <div className="hero hero--home">
          <div className="hero-body">

            <h3 className="title is-2">Lobby</h3>
            <p className="subtitle">Join an existing game or create one</p>
            <button className="button is-black is-outlined">Create game</button>

          </div>
        </div>

        <div className="columns">
          <div className="column">
            <Query query={GET_GAMES}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />;
                if (error) return <p>Error!!!</p>;
                return this.createLobbyTable(data);
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
