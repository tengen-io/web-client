import React, { Component } from "react";
// Style
import style from '../../stylesheets/gridLine.scss';

export default class GridLine extends Component {

    render() {

    return (
        <section className={ "grid-line " + this.props.position }>
            <div className="vertical-line"></div>
            <div className="horizontal-line"></div>
        </section>
    );
  }
}