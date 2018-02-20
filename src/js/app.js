
import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './components/board';

render(Board(9), document.getElementById('app'));
