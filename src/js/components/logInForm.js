import React, {Component} from 'react';
import Input from '../components/input';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

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

  buildParams() {
    return {
      variables: this.state,
    };
  }

  renderLoginForm() {
    return (
      <form
        className="column is-one-third"
        onSubmit={e => {
          e.preventDefault();
          login(this.buildParams());
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
  }

  render() {
    return (
      <Mutation mutation={LOG_IN}>
        {(createUser, {data}) => this.renderLoginForm(logIn)}
      </Mutation>
    );
  }
}

const LOG_IN = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      token
    }
  }
`;
