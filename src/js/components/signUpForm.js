import React, {Component} from 'react';
import Input from '../components/input';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

function createUser(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
    },
    method: 'POST',
  }).then(response => {
    response.json();
    console.log('the response', response.json());
  });
}

class SignUpForm extends React.Component {
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

  renderSignUpForm() {
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
        <button className="button is-fullwidth is-info">Create account</button>
      </form>
    );
  }

  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser, {data}) => this.renderSignUpForm(createUser)}
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

export default SignUpForm;
