import React from 'react';
import {Mutation, Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import Loading from '../components/loading';
import {GET_GAMES, GetGamesData, GetGamesVariables} from '../graphql/queries';
import {CREATE_INVITATION, ICreateGameInvitationInput, ICreateGameInvitationPayload} from '../graphql/mutations';
import IGame from "../models/game";
import {GameState, GameType} from "../models/enums";
import {AuthContextConsumer} from "../contexts/authContext";

const LobbyRow: React.FunctionComponent<{game: IGame}> = ({ game }) => {
  return (
    <tr key={game.id}>
      <td>
        <Link className="button is-fullwidth" to={`/game/${game.id}`}>
          Watch
        </Link>
      </td>
      <td>{game.id}</td>
      <td>PLAYER 0 FIXME</td>
      <td>PLAYER 1 FIXME</td>
    </tr>
  );
};

const LobbyTable: React.FunctionComponent<{games: IGame[]}> = ({games}) => {
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
          {games.map((game) => (
            <LobbyRow key={game.id} game={game} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

const CreateGameCard: React.FunctionComponent = () => {
  return (
    <Mutation<ICreateGameInvitationPayload, ICreateGameInvitationInput>
      mutation={ CREATE_INVITATION }
      variables={{ invitation: { boardSize: 19, type: GameType.Standard }}}>
      {(createGame, { loading, error, data }) => {
        if (data) {
          // FIXME(eac): replace this with game invitation flow?
          // return (
          //   <Redirect
          //     to={{
          //       pathname: `/game/${data.game.id}`,
          //       // state: { game: data.createGame },
          //     }}
          //   />
          // );
        }
        return (
          <div className="card">
            <div className="card-content">
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
                    Create Invitation
                  </button>
                )}
                {!loading && (
                  <button
                    type="button"
                    onClick={() => createGame() }
                    className="button is-black is-outlined is-fullwidth"
                  >
                    Create Invitation
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

const LobbyPage: React.FunctionComponent = () => {
  return (
    <section className="section page page--home">
      <div className="hero hero--home">
        <div className="hero-body">
          <h1 className="title is-1">Play</h1>
        </div>
      </div>

      <div className="container">
        <div className="columns is-centered">
          <AuthContextConsumer>
            {(authContext) => {
              if (authContext.token)
                return (<div className="column is-one-quarter">
                  <h4 className="title is-4">New game</h4>
                  <p className="subtitle has-text-grey">
                    Select an opponent
                  </p>
                  <CreateGameCard />
                </div>);
            }}
          </AuthContextConsumer>
          <div className="column is-three-quarters">
            <h4 className="title is-4">Invitations</h4>
              <Query<GetGamesData, GetGamesVariables>
                query={GET_GAMES} variables={{states: [GameState.Invitation]}}
                pollInterval={1000}>
                {({ loading, error, data}) => {
                  if (loading) return <Loading/>;
                  if (error || !data) return <p>Error!!!</p>;
                  return <LobbyTable games={data.games}/>;
                }}
              </Query>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="columns is-centered">
          <div className="column is-three-quarters">
            <h4 className="title is-4">Current games</h4>
            <p className="subtitle has-text-grey">
              Join an existing game
            </p>
            <Query<GetGamesData, GetGamesVariables> query={GET_GAMES} variables={{states: [GameState.InProgress]}}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />;
                if (error || !data) return <p>Error!!!</p>;
                return <LobbyTable games={data.games} />;
              }}
            </Query>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LobbyPage;
