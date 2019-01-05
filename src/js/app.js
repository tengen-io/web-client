import React, { Component } from 'react';
import { render } from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-client-preset';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { AUTH_TOKEN } from './utils/constants';

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
  // uri: `http://localhost:4000/api`,
  //uri: process.env['API_URL'],
  uri: `https://go-stop.herokuapp.com/api/graphiql`,
});

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);
// const httpLinkWithAuthToken = httpLink;

const client = new ApolloClient({
  // uri: 'https://go-stop.live/api',
  // uri: 'http://localhost:4000/api',
  //uri: process.env['API_URL'],
  uri: `https://go-stop.herokuapp.com/api/graphiql`,

  link: httpLinkWithAuthToken,
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
          <Route
            path="/register"
            render={props => (
              <RegisterPage
                {...props}
                updateCurrentUser={this.props.updateCurrentUser}
              />
            )}
          />
          <Route component={FourOhFourPage} />
        </Switch>
      </main>
    );
  }
}

// import AuthContext from './utils/AuthContext';
// const AuthProvider = AuthContext.Provider;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };

    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  updateCurrentUser(username) {
    console.log(this);
    this.setState({ currentUser: username });
  }

  render() {
    // TODO: Refactor using Context API
    // <AuthProvider value={this.state}>
    // </AuthProvider>
    return (
      <div className="app">
        <Header currentUser={this.state.currentUser} />
        <Main updateCurrentUser={this.updateCurrentUser} />
        <Footer />
      </div>
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

  document.getElementById('root')
);
