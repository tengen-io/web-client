import React, {SyntheticEvent} from 'react';
import Input from './input';
import {AuthContextConsumer} from '../contexts/authContext';
import AuthRepository from "../repositories/authRepository";

// TODO(eac): wire up success again
function renderSuccess() {
  return <p>You did it!</p>;
}

export interface SignupFormState {
  email: string,
  username: string,
  password: string,
  confirm: string,
  error?: Error,
}

export default class SignupForm extends React.PureComponent<{}, SignupFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirm: '',
    };
  }

  handleChange = (event: SyntheticEvent) => {
    const {currentTarget} = event;
    const target = currentTarget as HTMLInputElement;
    const {name} = target;

    const value =
      target.type === 'checkbox' ? target.checked : target.value;

    this.setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  buildParams() {
    return {
      variables: this.state,
    };
  }

  renderSignUpForm(repo: AuthRepository, loading: boolean, login: (username: any, token: any) => void, error?: Error) {
    const {
      username,
      email,
      password,
      confirm,
    } = this.state;
    return (
      <form
        className="column is-one-third"
        onSubmit={e => {
          e.preventDefault();
          if (password !== confirm) {
            // TODO(eac): handle this.
          }

          // TODO(eac): handle rejections properly
          repo.register(email, password, username).then(r => {
              if (r.status !== 200) {
                const err = new Error("failed to register new user");
                this.setState((prev) => ({...prev, error: err}));
                throw err;
              }
              return r.json();
            }
          ).then((json) => {
            this.setState((prev) => ({...prev, error: undefined}));
            login("", json.token);
          }).catch(() => {});
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
          name="confirm"
          label="Confirm password"
          inputType="password"
          content={confirm}
          controlFunc={this.handleChange}
          placeholder="Type your password again"
        />
        <br/>
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
            type="submit"
            className="button is-fullwidth is-black is-outlined"
          >
            Create account
          </button>
        )}
      </form>
    );
  }

  render() {
    const { error } = this.state;
    return (
      <AuthContextConsumer>
        {({repo, login}) => {
          return this.renderSignUpForm(
            repo,
            false,
            login,
            error
          );
        }}
      </AuthContextConsumer>
    );
  }
}
