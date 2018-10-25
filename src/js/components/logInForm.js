import React, { Component } from 'react';
import Input from '../components/input';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../utils/constants';
import AuthContext from '../utils/AuthContext';

function logIn(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  });
}

export default class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'thisnameexists',
      password: 'thispasswordexists',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  buildParams() {
    return {
      variables: this.state,
    };
    // console.log(this.state);
  }

  renderSuccess(data) {
    return <p>You did it!</p>;
  }

  handleSuccess(data) {
    console.log(data.logIn);
    const token = data.logIn.token;
    localStorage.setItem(AUTH_TOKEN, token);
  }

  renderLogInForm(logIn, loading) {
    return (
      <AuthContext.Consumer>
        {context => {
          return (
            <form
              className="column is-one-third"
              onSubmit={e => {
                e.preventDefault();
                // console.log(e);
                context.state.updateCurrentUser();
                logIn(this.buildParams());
              }}
            >
              <Input
                name="username"
                label="Username"
                inputType="text"
                content={this.state.username}
                controlFunc={this.handleChange}
                placeholder="username"
              />
              <Input
                name="password"
                label="Password"
                inputType="password"
                content={this.state.password}
                controlFunc={this.handleChange}
                placeholder="Must be at least 8 characters"
              />
              <br />
              <button className="button is-fullwidth is-info">Log in</button>
            </form>
          );
        }}
      </AuthContext.Consumer>
    );
  }

  render() {
    return (
      <Mutation mutation={LOG_IN}>
        {(logIn, { loading, error, data }) => {
          if (error) return this.renderError();
          if (data) {
            this.handleSuccess(data);
            return this.renderSuccess(data);
          }
          return this.renderLogInForm(logIn, loading);
        }}
      </Mutation>
    );
  }
}

const LOG_IN = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      token
      username
    }
  }
`;
