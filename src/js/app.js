import React, {Component} from 'react';
import {render} from 'react-dom';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import Header from './components/header';

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import LobbyPage from './pages/Lobby';
import GamePage from './pages/Game';
import RegisterPage from './pages/Register';

const client = new ApolloClient({
    uri: 'https://go-stop.live/api',
    // uri: 'http://localhost:4000/api',
    //uri: process.env['API_URL']
});

class Main extends React.Component {
    render() {
        return (
            <main className="main container">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/game" component={GamePage} />
                    <Route path="/lobby" component={LobbyPage} />
                    <Route path="/register" component={RegisterPage} />
                </Switch>
            </main>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
                <Main />
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
