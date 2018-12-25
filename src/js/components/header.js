import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../utils/constants';

import AuthContext from '../utils/AuthContext';

export default class Header extends React.Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <header className="header">
        <nav
          className="container header__navbar"
          role="navigation"
          aria-label="main navigation"
        >
          <Link className="header__navbar-item" to="/">
            Home
          </Link>
          <Link className="header__navbar-item" to="/about">
            About
          </Link>
          <Link className="header__navbar-item" to="/lobby">
            Lobby
          </Link>
          {authToken ? (
            <Link
              to="#"
              className="header__navbar-item header__navbar-item--right"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push(`/`);
              }}
            >
              Log out
            </Link>
          ) : (
            <Link
              to="/register"
              className="header__navbar-item header__navbar-item--right"
            >
              Sign in
            </Link>
          )}
        </nav>
      </header>
    );
  }
}
