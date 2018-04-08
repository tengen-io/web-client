import React, { Component } from 'react';
import { render } from 'react-dom';
import { BOARD } from './utils/constants';
import Game from './components/game';

require('../stylesheets/app.scss');

render(
    <Game size={BOARD.SIZE}/>, 
    document.getElementById('app'));
