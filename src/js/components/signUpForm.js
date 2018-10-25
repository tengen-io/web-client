import React, { Component } from 'react';
import Input from '../components/input';
import Loading from '../components/loading';
import { AUTH_TOKEN } from '../utils/constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import AuthContext from '../utils/AuthContext';

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

// _confirm = async () => {
//   const { name, email, password } = this.state;
//   if (this.state.login) {
//     const result = await this.props.loginMutation({
//       variables: {
//         email,
//         password,
//       },
//     });
//     const { token } = result.data.login;
//     this._saveUserData(token);
//   } else {
//     const result = await this.props.signupMutation({
//       variables: {
//         name,
//         email,
//         password,
//       },
//     });
//     const { token } = result.data.signup;
//     this._saveUserData(token);
//   }
//   this.props.history.push(`/`);
// };

// _saveUserData = token => {
//   localStorage.setItem(AUTH_TOKEN, token);
// };

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'thisemailexists@yahoo.com',
      username: 'thisnameexists',
      password: 'thispasswordexists',
      passwordConfirmation: 'thispasswordexists',
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
    <AuthContext.Consumer>
      {context => {
        // console.log(context);
        // context ? context.state.currentUser : 'NOPE';
        context.state.updateCurrentUser(data.username);
        return <p>You did it!</p>;
      }}
    </AuthContext.Consumer>;
  }

  handleSuccess(data) {
    const token = data.createUser.token;
    localStorage.setItem(AUTH_TOKEN, token);
  }

  renderError() {
    return <p>Error :(</p>;
  }

  renderSignUpForm(createUser, loading) {
    return (
      <form
        className="column is-one-third"
        onSubmit={e => {
          e.preventDefault();
          createUser(this.buildParams());
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
        {loading && (
          <button disabled className="button is-fullwidth is-info is-loading">
            Create account
          </button>
        )}
        {!loading && (
          <button className="button is-fullwidth is-info">
            Create account
          </button>
        )}
      </form>
    );
  }

  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser, { loading, error, data }) => {
          if (error) return this.renderError();
          if (data) {
            this.handleSuccess(data);
            return this.renderSuccess(data);
          }
          return this.renderSignUpForm(createUser, loading);
        }}
      </Mutation>
    );
  }
}

const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $passwordConfirmation: String!
    $username: String!
  ) {
    createUser(
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
      username: $username
    ) {
      id
      token
    }
  }
`;
