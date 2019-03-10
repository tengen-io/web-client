import React, {SyntheticEvent} from 'react';

import LogInForm from '../components/logInForm';
import SignupForm from '../components/signupForm';

const RegisterHero = (props: { title: string }) => {
  const { title } = props;
  return (<div className="hero has-text-centered">
    <div className="hero-body">
      <p className="title is-3">{title}</p>
    </div>
  </div>);
};

const FormComponent = (props: { shouldShowLogin: boolean }) => {
  const { shouldShowLogin } = props;
  return (
    <div className="columns is-centered">
      {shouldShowLogin ? <LogInForm /> : <SignupForm />}
    </div>
  );
};

export interface RegisterState {
  shouldShowLogin: boolean
}

export default class Register extends React.PureComponent<{}, RegisterState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      shouldShowLogin: false,
    };
  }

  handleFormSwitch = (e: SyntheticEvent) => {
    const { shouldShowLogin } = this.state;
    this.setState({shouldShowLogin: !shouldShowLogin});
  };

  render() {
    const { shouldShowLogin } = this.state;
    return (
      <section className="page page--registration">
        <RegisterHero
          title={shouldShowLogin ? 'Welcome back' : 'Join GoStop'}
        />
        <div className="columns is-centered">
          <div className="column is-one-third tabs is-centered is-fullwidth is-boxed">
            <ul>
              <li className={shouldShowLogin ? '' : 'is-active'}>
                <a onClick={this.handleFormSwitch}>Sign up</a>
              </li>
              <li className={shouldShowLogin ? 'is-active' : ''}>
                <a onClick={this.handleFormSwitch}>Log in</a>
              </li>
            </ul>
          </div>
        </div>
        <FormComponent shouldShowLogin={shouldShowLogin} />
      </section>
    );
  }
}
