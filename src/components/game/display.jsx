
import React, { Component } from "react";

import style from '../../stylesheets/display.scss';

export default class Display extends Component {

    render() {

    return (
        <section className="display">
            <span className="display__capture-count">
                <span className="display__capture-count--white-container">
                    <span className="display__capture-count--white-stone"></span>
                    <span className="display__capture-count--white-stone-capture-count">23</span>
                </span>
                <span className="display__capture-count--black-container">
                    <span className="display__capture-count--black-stone"></span>
                    <span className="display__capture-count--black-stone-capture-count">15</span>
                </span>
            </span>
            <button className="button button-primary display__pass-button">Pass</button>
        </section>
    );

  }
}