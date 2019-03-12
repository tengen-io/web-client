import * as React from "react";
import gql from "graphql-tag";
import Query from "react-apollo/Query";
import AuthRepository from "../repositories/authRepository";
import IViewer from "../models/viewer";
import ApolloClient, {NormalizedCacheObject, InMemoryCache, Operation} from "apollo-boost";
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

class GetViewerQuery extends Query<IViewer, {}> {}

export interface IAuthContext {
  username?: string
  token?: string
  repo: AuthRepository

  login: (username: string, token: string) => void
  logout: () => void
};

export interface IAuthStoreProps {
  repo: AuthRepository
}

export interface IAuthStoreState {
  token?: string
  viewer?: IViewer
}

const AUTH_TOKEN = "auth-token";

export const AuthStoreContext = React.createContext<IAuthContext>({
  username: undefined,
  token: undefined,
  // TODO(eac): How do I initialize this better?
  repo: new AuthRepository(""),

  login: (username: string, token: string) => { },
  logout: () => { },
});

export const AuthStoreConsumer = AuthStoreContext.Consumer;

export class AuthStore extends React.PureComponent<IAuthStoreProps, IAuthStoreState> {
  constructor(props: IAuthStoreProps) {
    super(props);

    this.client = new ApolloClient<NormalizedCacheObject>({
      uri: `${ApiRoot}/graphql`,
      request: this.addAuthHeader,
      cache: new InMemoryCache(),
    });

    this.state = {
      token: undefined,
    }
  }


  componentDidUpdate(prevProps: Readonly<IAuthStoreProps>, prevState: Readonly<IAuthStoreState>, snapshot?: any): void {
    const {token} = this.state;
    if (token !== prevState.token) {
      // todo(eac): invalidate apollo cache
    }
  }

  addAuthHeader = async (operation: Operation) => {
    const {token} = this.state;
    if (token) {
      const header = `Bearer ${token}`;
      operation.setContext({
        headers: {
          Authorization: header,
        }
      });
    }
  };

  login = (username: string, token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
    this.setState((prev) => ({...prev, token}))
  };

  logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    this.setState((prev) => ({...prev, token: undefined}));
  };

  private readonly client: ApolloClient<NormalizedCacheObject>;

  render() {
    const {token} = this.state;
    const {repo, children} = this.props;

    const value = {
      token,
      username: undefined,
      repo,
      login: this.login,
      logout: this.logout,
    };

    return (
      <ApolloProvider client={this.client}>
        <AuthStoreContext.Provider value={value}>
          {children}
        </AuthStoreContext.Provider>
      </ApolloProvider>
    );
  }
}
