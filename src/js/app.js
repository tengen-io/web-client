import React, { Component } from 'react';
import { render } from 'react-dom';

import Board from './components/board';

require('../stylesheets/app.scss');

render(<Board size="19" />, document.getElementById('app'));
