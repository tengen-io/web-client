// Sign up, sign in

import React, {Component} from 'react';

export default class RegisterPage extends React.Component {
    render() {
        return (
            <section className="page page--registration">
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
                            placeholder="baduk@example.com"
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="checkbox">
                            <input type="checkbox" />
                            I agree to the <a href="#">terms and conditions</a>
                        </label>
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
