// The default screen a logged in player sees

import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Loading from '../components/loading';

const GET_USERS = gql`
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

export default class LobbyPage extends React.Component {
  createLobbyRow(game) {
    return (
      <tr key={game.id}>
        <td>
          <a className="button is-black is-outlined" href="#">
            Join
          </a>{' '}
        </td>
        <td>{game.id}</td>
        <td>{game.players[0].id}</td>
        <td>{game.players[1].id}</td>
      </tr>
    );
  }

  createLobbyTable(data) {
    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th> </th>
            <th>Game ID</th>
            <th>⚫️ Player ID</th>
            <th>⚪️ Player ID</th>
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
            <p className="title">Lobby</p>
            <p className="subtitle">Here we make matches</p>
            <Query query={GET_USERS}>
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
