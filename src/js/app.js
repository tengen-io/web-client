import React, { Component } from 'react';
import { render } from 'react-dom';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import { BOARD } from './utils/constants';
import Game from './components/game';

require('../stylesheets/app.scss');

const client = new ApolloClient({
  // TODO: replace with env config
  uri: "http://localhost:4000/api"
});

client
  .query({
    query: gql`
      {
        users {
          username
        }
      }
    `
  })
  .then(data => console.log({ data }));

render(
    <ApolloProvider client={ client }><Game /></ApolloProvider>,
    document.getElementById('app'));
