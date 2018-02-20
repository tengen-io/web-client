
import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './components/board';

require('../stylesheets/app.scss');

export default class App extends Component {
  render() {
    return (
        <Board size="19"/>
    );
  }
}

render(<App />, document.getElementById('app'));
