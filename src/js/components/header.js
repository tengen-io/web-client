import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <nav
                    className="navbar container"
                    role="navigation"
                    aria-label="main navigation"
                >
                    <Link className="navbar-item" to="/">
                        Home
                    </Link>
                    <Link className="navbar-item" to="/about">
                        About
                    </Link>
                    <Link className="navbar-item" to="/lobby">
                        Lobby
                    </Link>
                    <Link className="navbar-item" to="/register">
                        Register
                    </Link>
                    <Link className="navbar-item" to="/game">
                        Game
                    </Link>
                </nav>
            </header>
        );
    }
}
