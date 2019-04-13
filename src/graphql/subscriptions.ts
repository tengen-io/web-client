import gql from 'graphql-tag'

export const SUBSCRIBE_GAMES = gql`
    subscription onGame($type: GameType) {
        games(type: $type)  {
            event
            game
        }
    }
`;
