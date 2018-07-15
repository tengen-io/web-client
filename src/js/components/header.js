import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../utils/constants';

export default class Header extends React.Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <header className="header">
        <nav
          className="container navbar header__navbar"
          role="navigation"
          aria-label="main navigation"
        >
          <Link className="navbar-item header__navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item header__navbar-item" to="/about">
            About
          </Link>
          <Link className="navbar-item header__navbar-item" to="/lobby">
            Lobby
          </Link>
          <Link className="navbar-item header__navbar-item" to="/game">
            Game
          </Link>

          {authToken ? (
            <Link
              to="#"
              className="navbar-item header__navbar-item"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push(`/`);
              }}
            >
              Log out
            </Link>
          ) : (
            <Link to="/register" className="navbar-item header__navbar-item">
              Sign in
            </Link>
          )}
        </nav>
      </header>
    );
  }
}
