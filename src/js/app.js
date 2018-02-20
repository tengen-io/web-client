import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './components/board';

// Example for 9x9 grid
render(Board(9), document.getElementById('app'));
