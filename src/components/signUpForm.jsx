import React from 'react';
import { Mutation } from 'react-apollo';
import Input from './input';
import AuthContext from '../utils/AuthContext';

import { CREATE_USER } from '../graphql/mutations';

// TODO(eac): figure out how this is used

// const URL = 'http://example.com/answer';
// function createUser(url, data) {
//   return fetch(url, {
//     body: JSON.stringify(data),
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'content-type': 'application/json',
//     },
//     method: 'POST',
//   });
// }

function renderSuccess() {
  return <p>You did it!</p>;
}

export default class SignUpForm extends React.PureComponent {
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
    const { target } = event;
    const { name } = target;
    const value =
      target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  buildParams() {
    return {
      variables: this.state,
    };
  }

  renderSignUpForm(createUser, loading, logIn, error) {
    const {
      username,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    return (
      <form
        className="column is-one-third"
        onSubmit={e => {
          e.preventDefault();
          createUser(this.buildParams()).then(({ data }) => {
            logIn(
              data.createUser.user.username,
              data.createUser.token,
            );
          });
        }}
      >
        <Input
          name="username"
          label="Username"
          inputType="text"
          content={username}
          controlFunc={this.handleChange}
          placeholder="username"
        />
        <Input
          name="email"
          label="Email"
          inputType="email"
          content={email}
          controlFunc={this.handleChange}
          placeholder="name@example.com"
        />
        <Input
          name="password"
          label="Password"
          inputType="password"
          content={password}
          controlFunc={this.handleChange}
          placeholder="Must be at least 8 characters"
        />
        <Input
          name="passwordConfirmation"
          label="Confirm password"
          inputType="password"
          content={passwordConfirmation}
          controlFunc={this.handleChange}
          placeholder="Type your password again"
        />
        <br />
        {error && (
          <div className="notification is-danger">
            {error.message}
          </div>
        )}
        {loading && (
          <button
            type="button"
            disabled
            className="button is-fullwidth is-black is-outlined is-loading"
          >
            Creating account...
          </button>
        )}
        {!loading && (
          <button
            type="button"
            className="button is-fullwidth is-black is-outlined"
          >
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
                  return this.renderSignUpForm(
                    createUser,
                    loading,
                    logIn,
                    error,
                  );
                }
                if (data) {
                  return renderSuccess(data);
                }
                return this.renderSignUpForm(
                  createUser,
                  loading,
                  logIn,
                );
              }}
            </Mutation>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
