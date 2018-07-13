// Sign up, sign in

import React, {Component} from 'react';

import Input from '../components/input';
import LogInForm from '../components/logInForm';
import SignUpForm from '../components/signUpForm';

import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const RegisterHero = props => (
  <div className="hero has-text-centered">
    <div className="hero-body">
      <p className="title is-2">{props.title}</p>
    </div>
  </div>
);

const FormComponent = props => {
  return (
    <div className="columns is-centered">
      {props.isLoggingIn ? <LogInForm /> : <SignUpForm />}
    </div>
  );
};

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
    };
    this.handleFormSwitch = this.handleFormSwitch.bind(this);
  }

  handleFormSwitch(event) {
    this.setState({isLoggingIn: !this.state.isLoggingIn});
  }

  render() {
    return (
      <section className="page page--registration">
        <RegisterHero
          title={this.state.isLoggingIn ? 'Welcome back' : 'Join GoStop'}
        />
        <div className="columns is-centered">
          <div className="column is-one-third tabs is-centered is-fullwidth is-boxed">
            <ul>
              <li className={this.state.isLoggingIn ? '' : 'is-active'}>
                <a onClick={this.handleFormSwitch}>Sign up</a>
              </li>
              <li className={this.state.isLoggingIn ? 'is-active' : ''}>
                <a onClick={this.handleFormSwitch}>Log in</a>
              </li>
            </ul>
          </div>
        </div>

        <FormComponent isLoggingIn={this.state.isLoggingIn} />
      </section>
    );
  }
}
