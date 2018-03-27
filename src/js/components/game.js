import React, { Component } from 'react';
import { render } from 'react-dom';
// import * as _ from 'ramda';
import { BOARD } from '../utils/constants';

import Board from './board';
import Display from './display';

export default class Game extends React.Component {
    render() {
        return (
            <section className="game columns">
                <div className="column is-two-thirds">
                    <Board size={BOARD.SIZE}/>
                </div>
                <div className="column is-one-third">
                    <Display />
                </div>
            </section>
        )
    }
}