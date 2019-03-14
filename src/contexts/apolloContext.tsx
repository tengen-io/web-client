import * as React from "react";
import {AuthContextConsumer} from "./authContext";
import ApolloClient, {NormalizedCacheObject, InMemoryCache, Operation, gql} from "apollo-boost";
import ApolloProvider from "react-apollo/ApolloProvider";

const ApiRoot = process.env.REACT_APP_API_URI;

interface ICtxProps {
  token?: string
}

class AuthedApolloContext extends React.PureComponent<ICtxProps, {}> {
  constructor(props: ICtxProps) {
    super(props);

    this.client = new ApolloClient<NormalizedCacheObject>({
      uri: `${ApiRoot}/graphql`,
      request: this.addAuthHeader,
      cache: new InMemoryCache(),
    });
  }

  addAuthHeader = async (operation: Operation) => {
    const {token} = this.props;
    if (token) {
      const header = `Bearer ${token}`;
      operation.setContext({
        headers: {
          Authorization: header,
        }
      });
    }
  };

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
