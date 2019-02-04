import React, { Component } from 'react';
import Input from '../components/input';
import Loading from '../components/loading';
import { AUTH_TOKEN } from '../utils/constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import AuthContext from '../utils/AuthContext';

import { CREATE_USER } from '../graphql/mutations';

const URL = 'http://example.com/answer';

function createUser(url, data) {
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

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
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
  }

  renderSuccess(data) {
    return <p>You did it!</p>;
  }

  renderSignUpForm(createUser, loading, logIn, error) {
    return (
      <form
        className="column is-one-third"
        onSubmit={e => {
          e.preventDefault();
          createUser(this.buildParams())
          .then(({ data }) => {
            console.log(data)
            logIn(data.createUser.user.username, data.createUser.token);
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
          name="email"
          label="Email"
          inputType="email"
          content={this.state.email}
          controlFunc={this.handleChange}
          placeholder="name@example.com"
        />
        <Input
          name="password"
          label="Password"
          inputType="password"
          content={this.state.password}
          controlFunc={this.handleChange}
          placeholder="Must be at least 8 characters"
        />
        <Input
          name="passwordConfirmation"
          label="Confirm password"
          inputType="password"
          content={this.state.passwordConfirmation}
          controlFunc={this.handleChange}
          placeholder="Type your password again"
        />
        <br />
        {error && <div className="notification is-danger">{error.message}</div>}
        {loading && (
          <button
            disabled
            className="button is-fullwidth is-black is-outlined is-loading"
          >
            Creating account...
          </button>
        )}
        {!loading && (
          <button className="button is-fullwidth is-black is-outlined">
            Create account
          </button>
        )}
      </form>
    );
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ logIn }) => {
          return (
            <Mutation mutation={CREATE_USER}>
              {(createUser, { loading, error, data }) => {
                if (error) {
                  return this.renderSignUpForm(createUser, loading, logIn, error);
                }
                if (data) {
                  return this.renderSuccess(data);
                }
                return this.renderSignUpForm(createUser, loading, logIn);
              }}
            </Mutation>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
