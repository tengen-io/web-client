import React, { Component } from 'react';
import { render } from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { AUTH_TOKEN, USERNAME } from './utils/constants';

import Header from './components/header';
import Footer from './components/footer';

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import LobbyPage from './pages/Lobby';
import GamePage from './pages/Game';
import RegisterPage from './pages/Register';
import FourOhFourPage from './pages/FourOhFour';

const httpLink = new HttpLink({
  // uri: `https://go-stop.live/api`,
  // uri: `http://localhost:8000/graphql`,
  //uri: process.env['API_URL'],
  uri: `http://18.223.97.75/graphql`,
});

const authHandler = operation => {
  // const token = localStorage.getItem(AUTH_TOKEN);
  const { token } = operation.getContext();
  const authHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      Authorization: authHeader,
    },
  });
};

const client = new ApolloClient({
  // uri: 'https://go-stop.live/api',
  // uri: 'http://localhost:8000/graphql',
  //uri: process.env['API_URL'],
  uri: `http://18.223.97.75/graphql`,

  request: authHandler,
  cache: new InMemoryCache(),
});

class Main extends Component {
  render() {
    return (
      <main className="main container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/lobby" component={LobbyPage} />
          <Route path="/game/:id" component={GamePage} />
          <Route path="/register" component={RegisterPage} />
          <Route component={FourOhFourPage} />
        </Switch>
      </main>
    );
  }
}

import AuthContext from './utils/AuthContext';
const AuthProvider = AuthContext.Provider;

class App extends Component {
  constructor(props) {
    super(props);

    this.logIn = (username, token) => {
      localStorage.setItem(USERNAME, username);
      localStorage.setItem(AUTH_TOKEN, token);
      this.setState({username, token});
    };

    this.logOut = () => {
      localStorage.removeItem(USERNAME);
      localStorage.removeItem(AUTH_TOKEN);
      this.setState({ username, token });
    }

    this.state = {
      username: localStorage.getItem(USERNAME),
      token: localStorage.getItem(AUTH_TOKEN),
      logIn: this.logIn,
      logOut: this.logOut,
    };
  }

  render() {
    return (
      <AuthProvider value={this.state}>
        <div className="app">
          <Header />
          <Main />
          <Footer />
        </div>
      </AuthProvider>
    );
  }
}

require('../stylesheets/index.scss');

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,

  document.getElementById('root'),
);
