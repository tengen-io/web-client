import gql from 'graphql-tag';
import IViewer from "../models/viewer";

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

