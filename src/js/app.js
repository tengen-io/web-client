import React, { Component } from 'react';
import { render } from 'react-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-client-preset';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
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

const httpLink = new createHttpLink({
  // uri: `https://go-stop.live/api`,
  // uri: `http://localhost:4000/api`,
  //uri: process.env['API_URL'],
  uri: `https://go-stop.herokuapp.com/api/graphiql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // uri: 'https://go-stop.live/api',
  // uri: 'http://localhost:4000/api',
  //uri: process.env['API_URL'],
  uri: `https://go-stop.herokuapp.com/api/graphiql`,
  link: authLink.concat(httpLink),
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

    this.updateCurrentUser = this.updateCurrentUser.bind(this);

    this.state = {
      currentUser: null,
      updateCurrentUser: this.updateCurrentUser,
    };

    const currentUsername = localStorage.getItem(USERNAME);
    if (currentUsername) {
      this.state.currentUser = currentUsername;
    }
  }

  updateCurrentUser(username) {
    this.setState({ currentUser: username });
  }

  render() {
    return (
      <AuthProvider value={this.state}>
        <div className="app">
          <Header currentUser={this.state.currentUser} />
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
