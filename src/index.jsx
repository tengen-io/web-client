import React, {Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {AuthStore} from './stores/authStore';

import Header from './components/header';
import Footer from './components/footer';

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import LobbyPage from './pages/Lobby';
import GamePage from './pages/Game';
import Register from './pages/Register';
import FourOhFourPage from './pages/FourOhFour';
import AuthRepository from "./repositories/authRepository";

const authHandler = operation => {
  // const token = localStorage.getItem(AUTH_TOKEN);
  const {token} = operation.getContext();
  const authHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      Authorization: authHeader,
    },
  });
};

const ApiRoot = process.env.REACT_APP_API_URI;

const client = new ApolloClient({
  uri: `${ApiRoot}/graphql`,
  request: authHandler,
  cache: new InMemoryCache(),
});

const Main = () => {
  return (
    <main className="main container">
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/lobby" component={LobbyPage}/>
        <Route path="/game/:id" component={GamePage}/>
        <Route path="/register" component={Register}/>
        <Route component={FourOhFourPage}/>
      </Switch>
    </main>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.authRepo = new AuthRepository(ApiRoot);
  }

  render() {
    return (
      <AuthStore repo={this.authRepo}>
        <div className="app">
          <Header/>
          <Main/>
          <Footer/>
        </div>
      </AuthStore>
    );
  }
}

require('./stylesheets/index.scss');

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ApolloProvider>,

  document.getElementById('root'),
);
