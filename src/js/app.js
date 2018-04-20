import React, {Component} from 'react';
import {render} from 'react-dom';
import {BOARD} from './utils/constants';
import Game from './components/game';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
    uri: 'https://go-stop.live/api',
    // uri: 'http://localhost:4000/api',
    //uri: process.env['API_URL']
});

require('../stylesheets/app.scss');

render(
    <ApolloProvider client={client}>
        <Game size={BOARD.SIZE} />
    </ApolloProvider>,
    document.getElementById('app')
);
