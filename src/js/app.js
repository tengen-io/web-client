import React, { Component } from 'react';
import { render } from 'react-dom';
import { BOARD } from './utils/constants';
import Game from './components/game';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: 'https://go-stop.live/api',
  // uri: 'http://localhost:4000/api',
  //uri: process.env['API_URL']
});

// import Home from '../pages/Home';
// import Isolog from '../pages/Isolog';
// import Fireball from '../pages/Fireball';
// import AllThePrimes from '../pages/AllThePrimes';
// import NotTheWeb from '../pages/NotTheWeb';
// import FourOhFour from '../pages/FourOhFour';

// const PAGES = {
//     '/': Home,
//     '/isolog': Isolog,
//     '/fireball': Fireball,
//     '/all-the-primes': AllThePrimes,
//     '/not-the-web': NotTheWeb,
// };

// class App extends Component {
//   render() {
//       const Handler = PAGES[this.props.pathname] || FourOhFour;

//       return <Handler />;
//   }
// }

// App.propTypes = {
//     pathname: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
// };


require('../stylesheets/app.scss');

render(
    <ApolloProvider client={ client }><Game size={BOARD.SIZE} /></ApolloProvider>,
    document.getElementById('app'));
