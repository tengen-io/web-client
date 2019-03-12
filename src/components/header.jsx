import React  from 'react';
import { Link } from 'react-router-dom';

import { AuthStoreConsumer } from '../stores/authStore';

const LoggedInLink = ({ currentUser, logOut }) => {
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
            <Link className="dropdown-item has-text-grey-lighter" to="#">
              Profile
            </Link>
            <Link className="dropdown-item has-text-grey-lighter" to="#">
              Inbox
            </Link>
            <Link className="dropdown-item has-text-grey-lighter" to="#">
              Preferences
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={logOut}
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

const Header = () => (
  <AuthStoreConsumer>
    {({ username, token, logout }) =>
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
          {token ? (
            <LoggedInLink currentUser="FIXME" logOut={logout} />
          ) : (
            <LoggedOutLink />
          )}
        </nav>
      </header>
    }
  </AuthStoreConsumer>
);

export default Header;
