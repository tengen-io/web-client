
import React, { Component } from "react";

import style from '../stylesheets/display.scss';

export default class Display extends Component {

    render() {

    return (
        <section id="display">
            <h3 className="display__time">
                <span className="display__time--white">2:02</span>
                <span className="display__time--black">3:12</span>
            </h3>
        </section>
    );

  }
}