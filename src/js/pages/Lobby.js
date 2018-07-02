// The default screen a logged in player sees

import React, {Component} from 'react';

export default class LobbyPage extends React.Component {
    render() {
        return (
            <section className="page page--home">
                <div className="hero hero--home">
                    <div className="hero-body">
                        <p className="title">Lobby</p>
                        <p className="subtitle">Here we make matches</p>
                    </div>
                </div>
            </section>
        );
    }
}
