import React from 'react';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../components/loading';
import {CREATE_INVITATION, ICreateGameInvitationInput, ICreateGameInvitationPayload} from '../graphql/mutations';
import IGame from "../models/game";
import {GameState, GameType} from "../models/enums";
import {AuthContextConsumer} from "../contexts/authContext";

const GET_GAMES = gql`
  query Games($states: [GameState!]) {
    games(states: $states) {
      id
      type
      state
      boardSize
      users {
        type
        user {
          id
          name
        }
      }
    }
  }
`;

interface GetGamesData {
  games: IGame[]
}

interface GetGamesVariables {
  states: GameState[]
}

const JOIN_GAME = gql`
  mutation JoinGame($id: ID!) {
    joinGame(gameId: $id) {
      game {
        id
        state
        users {
          type 
          user {
            id
            name
          }
        }
      }
    }
  }
`;

interface JoinGameData {
  game: IGame;
}

interface JoinGameVariables {
  id: string
}

const LobbyCard: React.FunctionComponent<{game: IGame}> = ({game}) => {
  switch (game.state) {
    case GameState.Invitation:
      return (
        <div>
          <ul>
            <li>Type: {game.type}</li>
            <li>Size: {game.boardSize}</li>
            <li>Players:
              <ul>
                {game.users.map((user) => {
                  return (<li> {user.user.name} ({user.type})</li>)
                })}
              </ul>
            </li>
          </ul>
          <Mutation<JoinGameData, JoinGameVariables> mutation={JOIN_GAME} variables={{id: game.id}}>
            {(joinGame, { loading, error, data }) => {
              return (
                <button type="button" disabled={loading} onClick={() => joinGame()} className="button is-black is-outlined is-fullwidth">
                  Join Game
                </button>
              );
            }}
          </Mutation>
        </div>
      );

    default:
      return (
        <div>unknown game state</div>
      )
  }
};

const LobbyCards: React.FunctionComponent<{games: IGame[]}> = ({games}) => {
  return (
    <section className="card">
      <div>
        {games.map((game) => (
          <LobbyCard key={game.id} game={game} />
        ))}
      </div>
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
};

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

              return (<div></div>);
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
                  return <LobbyCards games={data.games}/>;
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
                return <LobbyCards games={data.games} />;
              }}
            </Query>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LobbyPage;
