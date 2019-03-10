import React from 'react';
import Input from './input';
import { Mutation } from 'react-apollo';
import { AuthStoreConsumer } from '../stores/authStore';

import { LOG_IN } from '../graphql/mutations';

function renderSuccess() {
  return <p>You did it!</p>;
}

export default class LogInForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  renderLogInForm(logIn, loading, updateCurrentUser, error) {
    const { username, password } = this.state;
    return (
      <form
        className="column is-one-third"
        onSubmit={e => {
          e.preventDefault();
          logIn({
            variables: this.state,
          }).then(({ data }) => {
            updateCurrentUser(data.login.user.username, data.login.token);
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
          name="password"
          label="Password"
          inputType="password"
          content={password}
          controlFunc={this.handleChange}
          placeholder="Must be at least 8 characters"
        />
        <br />
        {error && <div className="notification is-danger">{error.message}</div>}
        {loading && (
          <button
            type="button"
            disabled
            className="button is-fullwidth is-black is-outlined is-loading"
          >
            Logging in...
          </button>
        )}
        {!loading && (
          <button type="button" className="button is-fullwidth is-black is-outlined">
            Log in
          </button>
        )}
      </form>
    );
  }

  render() {
    return (
      <AuthStoreConsumer>
        {({ logIn }) => {
          return (
            <Mutation mutation={LOG_IN}>
              {(logInMutation, { loading, error, data }) => {
                if (data) {
                  return renderSuccess(data);
                }
                return this.renderLogInForm(
                  logInMutation,
                  loading,
                  logIn,
                  error
                );
              }}
            </Mutation>
          );
        }}
      </AuthStoreConsumer>
    );
  }
}
