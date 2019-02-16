import gql from 'graphql-tag';

export const GET_GAME = gql`
  query Game($id: ID!) {
    game(id: $id) {
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
`;

export const GET_GAMES = gql`
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
