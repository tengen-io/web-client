// The default screen a logged in player sees

import React from 'react';
import { Query, Mutation } from 'react-apollo';
import Loading from '../components/loading';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { GET_GAMES } from '../graphql/queries';
import { CREATE_GAME } from '../graphql/mutations';
import { AuthContextConsumer } from '../contexts/authContext';
import Input from '../components/input';

const LobbyRow = ({ game }) => {
  return (
    <tr key={game.id}>
      <td>
        <Link className="button is-fullwidth" to={`/game/${game.id}`}>
          Watch
        </Link>
      </td>
      <td>{game.id}</td>
      <td>{game.players[0].user.username}</td>
      <td>{game.players[1].user.username}</td>
    </tr>
  );
};

const LobbyTable = ({ games }) => {
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
          {games.map((game, index) => (
            <LobbyRow key={index} game={game} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

class CreateGameCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      opponentUsername: '',
    };
  }

  handleOpponentUsernameChange = event => {
    this.setState({ opponentUsername: event.target.value });
  };

  render() {
    const { opponentUsername } = this.state;
    return (
      <AuthContextConsumer>
        {({ token }) => {
          return (
            <Mutation
              mutation={CREATE_GAME}
              variables={{ opponentUsername }}
              context={{ token }}
            >
              {(createGame, { loading, error, data }) => {
                if (data) {
                  return (
                    <Redirect
                      to={{
                        pathname: `/game/${data.createGame.id}`,
                        state: { game: data.createGame },
                      }}
                    />
                  );
                }
                return (
                  <div className="card">
                    <div className="card-content">
                      <p>Opponent Username</p>
                      <Input
                        name="opponentUsername"
                        inputType="text"
                        placeholder="leesedol"
                        content={opponentUsername}
                        controlFunc={
                          this.handleOpponentUsernameChange
                        }
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
                            type="button"
                            disabled
                            className="button is-black is-outlined is-fullwidth is-loading"
                          >
                            Create game
                          </button>
                        )}
                        {!loading && (
                          <button
                            type="button"
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
        }}
      </AuthContextConsumer>
    );
  }
}

const LobbyPage = () => {
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
};

export default LobbyPage;
