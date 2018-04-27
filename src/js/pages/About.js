// Simple text only page about the project

// README, humans.txt, social links
import React, {Component} from 'react';

export default class AboutPage extends React.Component {
    render() {
        return (
            <section className="page page--home">
                <div className="hero is-info hero--home">
                    <div className="hero-body">
                        <p className="title">About</p>
                        <p className="subtitle">I'm the about page</p>
                    </div>
                </div>
            </section>
        );
    }
}
