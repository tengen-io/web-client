import * as React from "react";
import {AuthContextConsumer} from "./authContext";
import ApolloClient, {NormalizedCacheObject, InMemoryCache, Operation, gql} from "apollo-boost";
import ApolloProvider from "react-apollo/ApolloProvider";

const ApiRoot = process.env.REACT_APP_API_URI;

const GET_VIEWER = gql`
    {
        viewer {
            id
            user
        }
    }
`;

type Props = {}

const apolloContext: React.FunctionComponent<Props> = (props) => {
  let token: string | undefined;

  const addAuthHeader = async (operation: Operation) => {
    if (token) {
      const header = `Bearer ${token}`;
      operation.setContext({
        headers: {
          Authorization: header,
        }
      });
    }
  };

  const client = new ApolloClient<NormalizedCacheObject>({
    uri: `${ApiRoot}/graphql`,
    request: addAuthHeader,
    cache: new InMemoryCache(),
  });

  return (
    <AuthContextConsumer>
      { context => {
        token = context.token;
        return (
          <ApolloProvider client={client}>
            { props.children }
          </ApolloProvider>
        )
      }}
    </AuthContextConsumer>
  );
};

export default apolloContext;
