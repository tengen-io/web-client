// Sign up, sign in

import React, {Component} from 'react';
import Input from '../components/input';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const URL = 'http://example.com/answer';

const RegisterHero = () => (
  <div className="hero has-text-centered">
    <div className="hero-body">
      <p className="title">Welcome</p>
      <p className="subtitle">
        Create an account or sign in to an existing one
      </p>
    </div>
  </div>
);

function createUser(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  }).then(response => response.json()); // parses response to JSON
}

class FormComponent extends React.Component {
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

  renderForm(createUser) {
    return (
      <section className="page page--registration">
        <RegisterHero />

        <div className="columns is-centered">
          <form
            className="column is-one-third"
            onSubmit={e => {
              e.preventDefault();
              console.log(this.state);
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
              placeholder=""
            />
            <Input
              name="passwordConfirmation"
              label="Confirm password"
              inputType="password"
              content={this.state.passwordConfirmation}
              controlFunc={this.handleChange}
              placeholder=""
            />
            <button className="button">Create account</button>
          </form>
        </div>
      </section>
    );
  }

  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser, {data}) => this.renderForm(createUser)}
      </Mutation>
    );
  }
}

export default class RegisterPage extends React.Component {
  render() {
    return (
      <section className="page page--registration">
        <RegisterHero />
        <FormComponent />
      </section>
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
