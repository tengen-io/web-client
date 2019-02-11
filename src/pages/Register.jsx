// Sign up, sign in

import React from 'react';

import LogInForm from '../components/logInForm';
import SignUpForm from '../components/signUpForm';

const RegisterHero = (props) => {
  const { title } = props;
  return (<div className="hero has-text-centered">
    <div className="hero-body">
      <p className="title is-3">{title}</p>
    </div>
  </div>);
};

const FormComponent = (props) => {
  const { shouldShowLogIn } = props;
  return (
    <div className="columns is-centered">
      {shouldShowLogIn ? <LogInForm /> : <SignUpForm />}
    </div>
  );
};

export default class RegisterPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowLogIn: false,
    };
  }

  handleFormSwitch = (event) => {
    const { shouldShowLogIn } = this.state;
    this.setState({shouldShowLogIn: !shouldShowLogIn});
  };

  render() {
    const { shouldShowLogIn, handleFormSwitch } = this.state;
    return (
      <section className="page page--registration">
        <RegisterHero
          title={shouldShowLogIn ? 'Welcome back' : 'Join GoStop'}
        />
        <div className="columns is-centered">
          <div className="column is-one-third tabs is-centered is-fullwidth is-boxed">
            <ul>
              <li className={shouldShowLogIn ? '' : 'is-active'}>
                <a onClick={handleFormSwitch}>Sign up</a>
              </li>
              <li className={shouldShowLogIn ? 'is-active' : ''}>
                <a onClick={handleFormSwitch}>Log in</a>
              </li>
            </ul>
          </div>
        </div>
        <FormComponent shouldShowLogIn={shouldShowLogIn} />
      </section>
    );
  }
}
