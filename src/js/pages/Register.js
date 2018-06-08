// Sign up, sign in

import React, { Component } from 'react';
import Input from '../components/input';
import { Mutation } from 'react-apollo';
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
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  })
  .then(response => response.json()) // parses response to JSON
}

class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  buildParams() {
    return ({
      variables: this.state
    })
  }

  renderForm(createUser) {
    return( <section className="page page--registration">
      <RegisterHero />

      <div className="columns is-centered">
        <form className="column is-one-third"
              onSubmit={e => {
                    e.preventDefault();
                    console.log(this.state);
                    createUser(this.buildParams());
                  }}>
          <input type="text"
                label="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="username" />
          <input type="email"
                label="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="name@example.com" />
          <input type="password"
                label="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="" />
          <input type="password"
                label="Confirm password"
                name="passwordConfirmation"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
                placeholder="" />
          <button className="button">Create account</button>
        </form>
      </div>
    </section>
    )
  }

  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser, { data }) => (
          this.renderForm(createUser)
        )}
      </Mutation>
    );
  }
};

export default class RegisterPage extends React.Component {
  render() {
    return <FormComponent />;
  }
}

const CREATE_USER =
  gql`
   mutation CreateUser($email: String!, $password: String!, $passwordConfirmation: String!, $username: String!) {
     createUser(email: $email, password: $password, passwordConfirmation: $passwordConfirmation, username: $username) {
       id
       token
     }
   }`;
