
import React, { Component } from "react";

import style from '../stylesheets/app.scss';

export default class App extends Component {

    render() {

        return (
            <section id="app">
                <p>I'm an pp</p>
                { this.props.children }
            </section>
        );

    }
}