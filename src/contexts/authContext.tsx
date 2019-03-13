import * as React from "react";
import AuthRepository from "../repositories/authRepository";

export interface IAuthContext {
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
}

const AUTH_TOKEN = "auth-token";

const context = React.createContext<IAuthContext>({
  token: undefined,
  // TODO(eac): How do I initialize this better?
  repo: new AuthRepository(""),

  login: (username: string, token: string) => { },
  logout: () => { },
});

export const AuthContextConsumer = context.Consumer;

export class AuthContext extends React.PureComponent<IAuthStoreProps, IAuthStoreState> {
  constructor(props: IAuthStoreProps) {
    super(props);

    const token = localStorage.getItem(AUTH_TOKEN);

    this.state = {
      token: token ? token : undefined,
    }
  }

  componentDidUpdate(prevProps: Readonly<IAuthStoreProps>, prevState: Readonly<IAuthStoreState>, snapshot?: any): void {
    const {token} = this.state;
    if (token !== prevState.token) {
      // todo(eac): invalidate apollo cache
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
      repo,
      login: this.login,
      logout: this.logout,
    };

    return (
      <context.Provider value={value}>
        {children}
      </context.Provider>
    );
  }
}
