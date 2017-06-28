
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Game from './components/game';

export default (
    
    <Route path='/' component={ App }>
        <IndexRoute component={ Game } />
        <Route path='*' component={ Game } />
    </Route>

);