import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN, USERNAME } from '../utils/constants';

import AuthContext from '../utils/AuthContext';

const LoggedInLink = ({ currentUser }) => {
  return (
    <div className="header__navbar-item header__navbar-item--right">
      <div className="dropdown is-hoverable">
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu4"
          >
            <span>{currentUser}</span>
          </button>
        </div>
        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <Link className="dropdown-item" to="#">
              🚧 Profile
            </Link>
            <Link className="dropdown-item" to="#">
              🚧 Inbox
            </Link>
            <Link className="dropdown-item" to="#">
              🚧 Preferences
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                localStorage.removeItem(USERNAME);
                this.props.history.push(`/`);
              }}
            >
              Log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoggedOutLink = () => {
  return (
    <div className="header__navbar-item header__navbar-item--right">
      <div className="dropdown is-hoverable">
        <div className="dropdown-trigger">
          <Link className="button is-link is-outlined" to="/register">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

const Header = ({ currentUser }) => (
  <header className="header">
    <nav
      className="container header__navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <Link className="header__navbar-item" to="/lobby">
        Play
      </Link>
      <Link className="header__navbar-item" to="/about">
        Learn
      </Link>
      <Link className="header__navbar-item" to="/lobby">
        Watch
      </Link>
      {currentUser ? (
        <LoggedInLink currentUser={currentUser} />
      ) : (
        <LoggedOutLink />
      )}
    </nav>
  </header>
);

export default Header;
