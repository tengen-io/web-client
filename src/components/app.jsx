
import React, { Component } from "react";
import Header from "./header";

import style from '../stylesheets/app.scss';

export default class App extends Component {

    render() {

        return (
            <section id="app">
                <Header/>
                { this.props.children }
            </section>
        );

    }
}