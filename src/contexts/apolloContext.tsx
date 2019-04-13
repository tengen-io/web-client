import * as React from "react";
import {AuthContextConsumer} from "./authContext";
import {ApolloClient} from 'apollo-client';
import {InMemoryCache, NormalizedCacheObject, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import ApolloProvider from 'react-apollo/ApolloProvider';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

const ApiHost = process.env.REACT_APP_API_HOST;
const ApiScheme = process.env.REACT_APP_API_SCHEME;

interface ICtxProps {
  token?: string
}

class AuthedApolloContext extends React.PureComponent<ICtxProps, {}> {
  constructor(props: ICtxProps) {
    super(props);

    const {token} = this.props;

    const httpLink = createHttpLink({
      uri: `${ApiScheme}://${ApiHost}/graphql`
    });

    const wsLink = new WebSocketLink({
      uri: `ws://${ApiHost}/graphql`,
      options: {
        reconnect: true,
        connectionParams: {
          authorization: token,
        }
      }
    });

    const authLink = setContext((_, {headers}) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });

    const link = split(({query}) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation == 'subscription';
    }, wsLink, authLink.concat(httpLink));

    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: []
        }
      }
    });

    this.client = new ApolloClient<NormalizedCacheObject>({
      link,
      cache: new InMemoryCache({ fragmentMatcher }),
    });
  }

  private readonly client: ApolloClient<NormalizedCacheObject>;

  render() {
    const { children } = this.props;

    return (
      <ApolloProvider client={this.client}>
        {children}
      </ApolloProvider>
    )
  }
}

const ApolloContext: React.FunctionComponent<{}> = (props) => {
  return (
    <AuthContextConsumer>
      { context => {
        return (
          <AuthedApolloContext token={context.token}>
            { props.children }
          </AuthedApolloContext>
        );
      }}
    </AuthContextConsumer>
  );
};

export default ApolloContext;
