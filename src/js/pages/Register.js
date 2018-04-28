// Sign up, sign in

import React, {Component} from 'react';

export default class RegisterPage extends React.Component {
    render() {
        return (
            <section className="page page--registration">

                <div className="hero hero--home">
                    <div className="hero-body">
                        <p className="title">Register</p>
                        <p className="subtitle">Sign up or sign in</p>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Pick a username"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="email"
                            placeholder="name@example.com"
                        />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Submit</button>
                    </div>
                </div>
            </section>
        );
    }
}
