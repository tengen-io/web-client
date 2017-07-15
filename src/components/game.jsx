
import React, { Component } from "react";
import Board from './board';
import Display from './display';

import style from '../stylesheets/game.scss';

export default class Game extends Component {

    render() {

    return (
        <section id="game" className="container grid-960">
            <Board/>
            <Display/>
        </section>
    );

  }
}