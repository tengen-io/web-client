import * as React from "react";
import AuthRepository from "../repositories/authRepository";

export interface IAuthContext {
  username?: string,
  token?: string,
  repo: AuthRepository
  login: (username: string, token: string) => void,
  logout: () => void,
};

export interface IAuthStoreProps {
  repo: AuthRepository
}

export interface IAuthStoreState {
  token?: string
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
    this.state = {
      token: undefined
    }
  }

  login = (username: string, token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
    this.setState((prev) => ({...prev, token}))
  };

  logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    this.setState((prev) => ({...prev, token: undefined}));
  };

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
      <AuthStoreContext.Provider value={value}>
        {children}
      </AuthStoreContext.Provider>
    );
  }
}
