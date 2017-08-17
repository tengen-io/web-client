
// Libraries
import React, { Component } from "react";
import R from "ramda";
// Component
import GridLine from "./gridLine"
// Style
import style from '../../stylesheets/stone.scss';

export default class Square extends Component {

    render() {
        console.log(this.props)
        return <section className={"stone " + this.props.color}></section>
        
    }
}