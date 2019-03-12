import React, {Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import ApolloContext from './contexts/apolloContext';
import {AuthContext} from './contexts/authContext';

import Header from './components/header';
import Footer from './components/footer';

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import LobbyPage from './pages/Lobby';
import GamePage from './pages/Game';
import Register from './pages/Register';
import FourOhFourPage from './pages/FourOhFour';
import AuthRepository from "./repositories/authRepository";

const ApiRoot = process.env.REACT_APP_API_URI;

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
      <AuthContext repo={this.authRepo}>
        <ApolloContext>
          <div className="app">
            <Header/>
            <Main/>
            <Footer/>
          </div>
        </ApolloContext>
      </AuthContext>
    );
  }
}

require('./stylesheets/index.scss');

render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,

  document.getElementById('root'),
);
