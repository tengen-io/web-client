import React, { Component } from 'react';
import Input from '../components/input';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN, USERNAME } from '../utils/constants';
import AuthContext from '../utils/AuthContext';

import { Navigation } from 'react-router';

export default class LogInForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      username: '',
      password: '',
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

  renderSuccess(data) {
    const token = data.logIn.token;
    const username = data.logIn.username;
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USERNAME, username);
    return <p>You did it!</p>;
  }

  renderLogInForm(logIn, loading, updateCurrentUser, error) {
    return (
      <form
        className="column is-one-third"
        onSubmit={e => {
          e.preventDefault();
          logIn({
            variables: this.state,
          }).then(res => {
            updateCurrentUser(res.data.logIn.username);
          });
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
        {error && <div className="notification is-danger">{error.message}</div>}
        {loading && (
          <button
            disabled
            className="button is-fullwidth is-black is-outlined is-loading"
          >
            Logging in...
          </button>
        )}
        {!loading && (
          <button className="button is-fullwidth is-black is-outlined">
            Log in
          </button>
        )}
      </form>
    );
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ currentUser, updateCurrentUser }) => {
          return (
            <Mutation mutation={LOG_IN}>
              {(logIn, { loading, error, data }) => {
                if (data) {
                  return this.renderSuccess(data);
                }
                return this.renderLogInForm(
                  logIn,
                  loading,
                  updateCurrentUser,
                  error
                );
              }}
            </Mutation>
          );
        }}
      </AuthContext.Consumer>
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
