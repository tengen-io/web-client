import gql from 'graphql-tag';
import IViewer from "../models/viewer";
import IGame from "../models/game";
import {GameState} from "../models/enums";

export const GET_VIEWER = gql`
    {
        viewer {
            id
            user {
                id
                name
            }
        }
    }
`;

export interface GetViewerData {
  viewer: IViewer
}

export const GET_GAMES = gql`
  query Games($states: [GameState!]) {
    games(states: $states) {
      id
      type
      state
      boardSize
    }
  }
`;

export interface GetGamesData {
    games: IGame[]
}

export interface GetGamesVariables {
    states: GameState[]
}
