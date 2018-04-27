import React, {Component} from 'react';

import Game from '../components/game';
import {BOARD} from '../utils/constants';

export default class GamePage extends React.Component {
    render() {
        return <Game size={BOARD.SIZE} />;
    }
}
