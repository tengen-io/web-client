import React from 'react';
import {Mutation, Query, Subscription} from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../components/loading';
import {GameState} from "../models/enums";
import {AuthContextConsumer} from "../contexts/authContext";
import {IMatchmakingRequest} from "../models/matchmaking";
import IGame from "../models/game";
import {GET_VIEWER, GetViewerData} from "../graphql/queries";
import {IUser} from "../models/viewer";

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

const SUBSCRIBE_MATCHMAKING = gql`
  subscription MatchmakingRequest {
    matchmakingRequests {
      __typename
      ... on MatchmakingRequestPayload {
        requests {
          id
          createdAt
        }
      }
      ... on MatchmakingRequestCompletePayload {
        game {
          id
          users {
              user {
                  id
                  name
              }
          }
        }
      }
    }
  }
`;

interface ISubscribeMatchmakingRequestsVariables {
  user: string
}

interface IMatchmakingRequestPayload {
  kind: "MatchmakingRequest"
  requests: [IMatchmakingRequest]
}

interface IMatchmakingRequestCompletePayload {
  kind: "MatchmakingRequestComplete"
  game: IGame
}

type SubscribeMatchmakingRequestsPayload = IMatchmakingRequestPayload | IMatchmakingRequestCompletePayload;


const CREATE_MATCHMAKING_REQUEST = gql`
  mutation CreateMatchmakingRequest($input: CreateMatchmakingRequestInput!) {
      createMatchmakingRequest(input: $input) {
          request {
              id
              createdAt
              updatedAt
          }
      }
  }
`;

interface ICreateMatchmakingRequestInput {
  input: {
    delta: number
  }
}

interface ICreateMatchmakingRequestData {
  request: IMatchmakingRequest
}

const LobbyCard: React.FunctionComponent<{game: IGame}> = ({game}) => {
  switch (game.state) {
    case GameState.Negotiation:
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
    <Mutation<ICreateMatchmakingRequestData, ICreateMatchmakingRequestInput>
      mutation={ CREATE_MATCHMAKING_REQUEST }
      variables={{ input: { delta: 3 }}}>
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
                {
                  loading && (
                  <button
                    type="button"
                    disabled
                    className="button is-black is-outlined is-fullwidth is-loading"
                  >
                    Search
                  </button>
                )}
                {!loading && (
                  <button
                    type="button"
                    onClick={() => createGame() }
                    className="button is-black is-outlined is-fullwidth"
                  >
                    Search
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

const MatchmakeStatusCard: React.FunctionComponent<{user: IUser}> = ({user}) => {
  return (
    <Subscription<SubscribeMatchmakingRequestsPayload, ISubscribeMatchmakingRequestsVariables> subscription={SUBSCRIBE_MATCHMAKING} variables={{user: user.id}}>
      {({data, error, loading}) => {
        if (loading) {
          return "loading";
        }

        if (error) {
          return `subscription error: ${JSON.stringify(error)}`;
        }

        if (data) {
          switch (data.kind) {
            case "MatchmakingRequest":
              break;
            case "MatchmakingRequestComplete":
              return (<div>game matched: {data.game.id} </div>);
            default:
              return (<div>{JSON.stringify(data)}</div>);
          }
        }
        return (<div>wtf</div>);
      }}
    </Subscription>
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
                  <h4 className="title is-4">Find a game</h4>
                  <CreateGameCard />
                  <Query<GetViewerData> query={GET_VIEWER}>
                    {({data, error, loading}) => {
                      if (loading) {
                        return "loading"
                      }

                      if (error) {
                        return "error"
                      }

                      if (data) {
                        return (<MatchmakeStatusCard user={data.viewer.user}/>);
                      }

                      return "wtf";
                    }}
                  </Query>
                </div>);

              return (<div></div>);
            }}
          </AuthContextConsumer>
          <div className="column is-three-quarters">
            <h4 className="title is-4">Games</h4>
              <Query<GetGamesData, GetGamesVariables>
                query={GET_GAMES} variables={{states: [GameState.Negotiation, GameState.InProgress]}} /* pollInterval={1000} */>
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
