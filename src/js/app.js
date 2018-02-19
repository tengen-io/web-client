import React, { Component } from 'react';
import { render } from 'react-dom';

require('../stylesheets/app.scss');

export default class Hello extends Component {
  render() {
    return (
      <p>
        Hello from react
      </p>
    );
  }
}

render(<Hello />, document.getElementById('app'));
