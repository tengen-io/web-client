import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './board';
import { ContainerView } from './components/components';

require('../stylesheets/app.scss');

let board = new Board({size: 19});

render(
  <ContainerView board={board} />, 
  document.getElementById('app')
);

