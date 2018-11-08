import React, { Component } from 'react';

import Game from '../components/game';
import { BOARD } from '../utils/constants';

export default class GamePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log(this.props);
    return <Game size={BOARD.SIZE} id={this.props.match.params.id} />;
  }
}
