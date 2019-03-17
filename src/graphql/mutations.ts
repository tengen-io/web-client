import gql from 'graphql-tag';
import {GameType} from "../models/enums";
import IGame from "../models/game";

export const CREATE_INVITATION = gql`
  mutation CreateGameInvitation($invitation: CreateGameInvitationInput!) {
      createGameInvitation(input: $invitation) {
          game {
              id
          }
      }
  }
`;

export interface ICreateGameInvitationInput {
  invitation: {
    type: GameType,
    boardSize: number
  }
}

export interface ICreateGameInvitationPayload {
  game: IGame
}

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

export const CREATE_GAME = gql`
  mutation CreateGame($opponentUsername: String!) {
    createGame(opponentUsername: $opponentUsername) {
      id
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
