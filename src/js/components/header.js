import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// <Link className="navbar-item" to="/game">Game</Link>

export default class Header extends React.Component {
  render() {
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
          <Link className="navbar-item header__navbar-item" to="/register">
            Sign in
          </Link>
        </nav>
      </header>
    );
  }
}
