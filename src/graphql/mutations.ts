import gql from 'graphql-tag';

export const LOG_IN = gql`
    mutation LogIn($username: String!, $password: String!) {
        logIn(username: $username, password: $password) {
            token
            user {
                username
            }
        }
    }
`;

export const ADD_STONE = gql`
  mutation AddStone($gameId: ID!, $x: Int!, $y: Int!) {
    addStone(gameId: $gameId, x: $x, y: $y) {
      id
      x
      y
      color
      game {
        id
        status
        playerTurnId
        players {
          id
          color
          user {
            id
            username
          }
        }
        boardSize
        stones {
          id
          x
          y
          color
        }
      }
    }
  }
`;

export const PASS = gql`
  mutation Pass($gameId: ID!) {
    pass(gameId: $gameId) {
      id
      playerTurnId
      status
    }
  }
`;
